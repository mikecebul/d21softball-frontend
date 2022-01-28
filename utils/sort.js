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

// Compare today's date with the date of the most recent tournaments to decide whether to display them or not
export const compareDate = (mostRecentTournamentYear) => {
  let date = new Date();
  let dateYear = date.getFullYear();
  let dateMonth = date.getMonth() + 1;
  let dateDay = date.getDate();
  let warning = true;
  let lastTourneyYear = parseInt(mostRecentTournamentYear);
  // If its past september 15th and no new tournaments are added for next year
  if (lastTourneyYear === dateYear && dateMonth >= "9" && dateDay >= "15") {
    dateYear = dateYear + 1;
    return { warning, dateYear };
  }
  // if its next year and still no new tournaments have been added
  if (lastTourneyYear < dateYear) {
    dateYear;
    return { warning, dateYear };
  }
  // if we have next year's tournament list available already
  if (lastTourneyYear > dateYear) {
    dateYear = dateYear + 1;
    return { warning: false, dateYear };
  }
  // Otherwise display most recent list of tournaments
  return { warning: false, dateYear };
};

// Sort Sponsors in order
export const sortSponsors = (x) => {
  const sorted = x.sort((a, b) => (a.list_order > b.list_order ? 1 : -1));
  return sorted;
};
