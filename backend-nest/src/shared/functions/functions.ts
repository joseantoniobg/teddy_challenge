export function getNumbersFromString(str: string): string {
  const res = str.replace(/\D/g, '');
  return res;
}