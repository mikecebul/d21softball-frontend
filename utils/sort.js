// Sorted Tournaments from earliest to latest

export const sortIncrement = (x) => {
  const sorted = x.sort((a, b) => (a.date_from < b.date_from ? 1 : -1));
  return sorted;
};
export const sortDecrement = (x) => {
  const sorted = x.sort((a, b) => (a.date_from > b.date_from ? 1 : -1));
  return sorted;
};

export const uniqueYears = (x) => {
  let years = x.map((item) => {
    return item.date_from.substring(0, 4);
  });
  return [...new Set(years)];
};

export const filteredItems = (list, date) => {
  let items = list.filter((item) => {
    if (item.date_from.substring(0, 4) === date) {
      return item;
    }
  });
  return items;
};
