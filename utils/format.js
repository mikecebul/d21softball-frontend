/**
 * Display the number with two digits
 * @param {string | number} number
 * @returns
 */
export const twoDecimals = (number) => parseFloat(number).toFixed(2);

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getYearRange(year) {
  const startDate = new Date(year, 0, 1).toISOString();
  const endDate = new Date(year, 11, 31).toISOString();
  return { startDate, endDate };
}