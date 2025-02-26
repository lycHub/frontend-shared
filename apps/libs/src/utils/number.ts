function minmax(value: number, range: number[]) {
  const validValue = value || 0;
  return Math.max(Math.min(validValue, range[1]), range[0]);
}

export {
  minmax
}