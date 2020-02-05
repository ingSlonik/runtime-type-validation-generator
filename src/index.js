#!/usr/bin/env node

const { readFileSync, writeFileSync } = require("fs");
const { transform } = require("babel-core");

const inputFileName = process.argv[2];
const outputFileName = process.argv[3];

// TODO: add checker of defined input and output file

function getExportedTypes(ast) {
    return ast.program.body
        .filter(item => item.type === "ExportNamedDeclaration")
        .flatMap(item => item.declaration.id.name);
}

const inputFile = readFileSync(inputFileName, "utf8");
const inputFileTransformed = transform(inputFile, { plugins: [ "syntax-flow" ] });
const exportedTypes = getExportedTypes(inputFileTransformed.ast);

const typedOutputFile = `${inputFile}
${exportedTypes.map(type => `
export function validate${type}(data): ${type} {
    return data;
}`).join("\n")}`;

const outputFileTransformed = transform(typedOutputFile, {
    plugins: [
        "syntax-flow",
        "tcomb",
        "transform-flow-strip-types"
    ]
});

writeFileSync(outputFileName, outputFileTransformed.code);
console.log(`Write output file to "${outputFileName}".`);

const typeDefinitionOfValidationsFile = `${inputFile}
${exportedTypes.map(type => `declare export function validate${type}(data: mixed): ${type};`).join("\n")}`;

const flowTypeDefinitionFileName = outputFileName.replace(".js", ".flow.js");

writeFileSync(flowTypeDefinitionFileName, typeDefinitionOfValidationsFile);
console.log(`Write type definition to "${outputFileName}".`);