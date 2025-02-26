import { TypeWithNull } from "../types";

function removePx(value: string) {
  return value ? value.slice(0, -2) : '0'
}

function setStyleProps(dom: HTMLElement, properties: Record<string, string>) {
  const props = Object.entries(properties);
  if (dom && props.length) {
    props.forEach(([key, value]) => {
      dom.style.setProperty(key, value);
    });
  }
}

function closest(el: HTMLElement, selector: string) {
  let result: TypeWithNull<HTMLElement> = null;
  while (el && !result) {
    if (el?.matches && el.matches(selector)) {
      result = el;
    }
    el = el.parentNode as HTMLElement;
  }
  return result;
}

export {
  removePx,
  setStyleProps,
  closest
}