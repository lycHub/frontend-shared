// Regular Expressions for parsing tags and attributes
const SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
// ! to ~ is the ASCII range.
const NON_ALPHANUMERIC_REGEXP = /([^#-~ |!])/g;


function encodeEntities(value: string): string {
  return encodeURIComponent(value)
    .replace(/&/g, '&amp;')
    .replace(SURROGATE_PAIR_REGEXP, (match: string) => {
      const hi = match.charCodeAt(0);
      const low = match.charCodeAt(1);
      return `&#${(hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000};`;
    })
    .replace(NON_ALPHANUMERIC_REGEXP, (match: string) => `&#${match.charCodeAt(0)};`)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export {
  encodeEntities
}