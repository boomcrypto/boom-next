export function isPositiveNumber(value) {
  return /(\.)?\d+(\.\d*)?/g.test(value);
}
