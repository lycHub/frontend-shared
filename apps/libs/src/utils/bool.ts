import { SingleOrArray } from "../types";
import { BoolOptions } from "./constants";

function validValue(value?: boolean | number) {
  return value == null ? -1 : +value;
}

function boolLabel(value?: boolean | number, options = BoolOptions) {
  const numValue = validValue(value);
  return options.find(item => item.value == numValue)?.label || '';
}

function fieldsToNumber<T extends Record<string, any>>(data: T, keys: SingleOrArray<keyof T>) {
  if (data) {
    const props = Array.isArray(keys) ? keys : [keys];
    props.filter(item => data[item] != null).forEach(item => {
      // @ts-ignore
      data[item] = +data[item];
    });
  }
  return data;
}

function fieldsToString<T extends Record<string, any>>(data: T, keys: SingleOrArray<keyof T>) {
  if (data) {
    const props = Array.isArray(keys) ? keys : [keys];
    props.filter(item => data[item] != null).forEach(item => {
      data[item] = data[item].toString();
    });
  }
  return data;
}

export {
  fieldsToNumber,
  boolLabel,
  fieldsToString
}