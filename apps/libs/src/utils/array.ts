import { Key } from "react";
import { SelectOption, TreeOption, TypeWithNull } from "../types";

function findTarget<T = Key>(value?: T, options?: SelectOption<T>[]) {
  return options?.find(item => item.value == value);
}

function findTree<T extends Record<string, any>>(key: TreeOption<T>['key'], tree: TreeOption<T>[]): TypeWithNull<TreeOption<T>> {
  let res: TypeWithNull<TreeOption<T>> = null;
  const loop = (list: TreeOption<T>[]) => {
    for (const item of list) {
      if (item.key === key) {
        res = item;
        break;
      }
      if (item.children?.length) {
        loop(item.children);
      }
    }
  }
  loop(tree);
  return res;
}

export {
  findTarget,
  findTree
}