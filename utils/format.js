/**
 * Display the number with two digits
 * @param {string | number} number
 * @returns
 */
export const twoDecimals = (number) => parseFloat(number).toFixed(2);

// Display they newest tournament year
export const upcommingTournamentYear = () => {
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
