import _t from "tcomb";
/* eslint-disable */
export const Data = _t.interface({
    id: _t.String,
    order: _t.Number,
    content: _t.list(Data)
}, "Data");

export function validateData(data) {
    const ret = function (data) {
        return data;
    }.call(this, data);

    _assert(ret, Data, "return value");

    return ret;
}

function _assert(x, type, name) {
    if (false) {
        _t.fail = function (message) {
            console.warn(message);
        };
    }

    if (_t.isType(type) && type.meta.kind !== 'struct') {
        if (!type.is(x)) {
            type(x, [name + ': ' + _t.getTypeName(type)]);
        }
    } else if (!(x instanceof type)) {
        _t.fail('Invalid value ' + _t.stringify(x) + ' supplied to ' + name + ' (expected a ' + _t.getTypeName(type) + ')');
    }

    return x;
}