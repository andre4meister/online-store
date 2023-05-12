export const createQueriesForFetch = (filters) => {
  let resultString = '?';
  const entriesArray = Object.entries(filters);
  for (let i = 0; i < entriesArray.length; i++) {
    const entry = entriesArray[i];
    if (i === entriesArray.length - 1) {
      resultString += `${entry[0]}=${entry[1]}`;
    } else {
      resultString += `${entry[0]}=${entry[1]}&`;
    }
  }
  return resultString;
};
