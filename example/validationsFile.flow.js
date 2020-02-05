export type Data = {
    id: string,
    order: number,
    content: Array<Data>,
};
declare export function validateData(data: mixed): Data;