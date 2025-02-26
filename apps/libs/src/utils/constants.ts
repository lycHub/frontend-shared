import { SelectOption } from "../types";

const DebounceTime = {
  quick: 100,
  normal: 300,
  middle: 600,
  slow: 800
}

const DateFormat = 'YYYY-MM-DD';
const DateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

const BoolOptions: SelectOption<number>[] = [
  {
    label: '是',
    value: 1
  },
  {
    label: '否',
    value: 0
  }
];

const DefCommonListParams = {
  current: 1,
  size: 10
}

export {
  DebounceTime,
  DateFormat,
  DateTimeFormat,
  BoolOptions,
  DefCommonListParams,
}