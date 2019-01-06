'use strict';

function getAllCitiesStatus(houses) {
  let citiesStatus = [];
  const cities = extractCities(houses);
  cities.forEach(place => {
    citiesStatus.push(getOneCityStatus(place, houses));
  });
  return citiesStatus;
}

function checkArray(data) {
  let qurArray = [];
  const citiesStatus = getAllCitiesStatus(data);
  citiesStatus.forEach((place, i) => {
    const { id, city, marketDate, totalPrice, totalCount, totalM2 } = place;
    qurArray[i] = [id, city, marketDate, totalPrice, totalCount, totalM2];
  });
  return qurArray;
}

export default checkArray;
