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
export const compareDate = (mostRecentTournamentYear, tournaments) => {
  let date = new Date();
  let currentYear = date.getFullYear();
  let dateMonth = date.getMonth() + 1;
  let dateDay = date.getDate();
  let warning = false;
  let lastTourneyYear = parseInt(mostRecentTournamentYear);

  // Check if there are tournaments for next year
  const hasNextYearTournaments = tournaments.some(tournament => 
    new Date(tournament.date_from).getFullYear() > currentYear);

   // Logic to set warning
   if (!hasNextYearTournaments && lastTourneyYear === currentYear && dateMonth >= 9 && dateDay >= 15) {
    warning = true;
  }

  // Return the most recent tournament year or current year
  return { warning, dateYear: lastTourneyYear > currentYear ? lastTourneyYear : currentYear };
};

// Sort Sponsors in order
export const sortSponsors = (x) => {
  const sorted = x.sort((a, b) => (a.list_order > b.list_order ? 1 : -1));
  return sorted;
};
