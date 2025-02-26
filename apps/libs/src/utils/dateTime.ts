function formatDate(date: Date, splitSymbol = '/') {
  return date.toLocaleDateString().replace(/\//g, splitSymbol);
}

export {
  formatDate
}