import { Key } from 'react';

type TypeWithUndefined<T> = T | undefined;
type TypeWithNull<T> = T | null;
type SingleOrArray<T> = T | T[];

interface CommonProps {
  className: string;
}

interface SelectOption<T = Key> {
  label: string;
  value: T;
  children?: SelectOption<T>[];
  [key: string]: any;
}

interface TreeOption<T extends Record<string, any>> {
  key: string;
  title: string;
  children?: TreeOption<T>[];
  originData?: T;
}

type CopyKeys<T> = {
  [P in keyof T]: T[P]
}
type PartialByKeys<
  T,
  K extends keyof any = keyof T
> = CopyKeys<Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>;

interface ServerResponseDto<T = any> {
  code: number;
  msg: string;
  data?: T;
}

export type {
  TypeWithUndefined,
  TypeWithNull,
  SelectOption,
  TreeOption,
  CommonProps,
  SingleOrArray,
  PartialByKeys,
  ServerResponseDto
}

