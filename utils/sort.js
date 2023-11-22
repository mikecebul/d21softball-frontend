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

export const uniquePastYears = (x) => {
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

export const compareDate = (currentYear, tournaments = []) => {
  let date = new Date();
  let dateYear = date.getFullYear();
  let dateMonth = date.getMonth() + 1;
  let dateDay = date.getDate();
  let warning = false;

  // Check if there are tournaments scheduled for the next year
  const hasNextYearTournaments = tournaments.some(tournament => 
    new Date(tournament.date_from).getFullYear() === currentYear + 1);

  // If it's past September 15th of the current year
  if (dateYear === currentYear && (dateMonth > 9 || (dateMonth === 9 && dateDay >= 15))) {
    // Increment the year for planning the next year's tournaments
    currentYear = dateYear + 1;
    // Set warning based on whether there are tournaments for the next year
    warning = !hasNextYearTournaments;
  }

  return { warning, dateYear: currentYear };
};

// Sort Sponsors in order
export const sortSponsors = (x) => {
  const sorted = x.sort((a, b) => (a.list_order > b.list_order ? 1 : -1));
  return sorted;
};
