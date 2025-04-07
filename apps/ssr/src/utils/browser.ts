export function canUseDom() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
