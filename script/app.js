"use strict";

const cityInput = document.getElementById("city");
const submitBtn = document.querySelector(".btn");
const cityInfo = document.getElementById("city-info");
const conditionInfo = document.getElementById("condition-info");
const tempInfo = document.getElementById("temp-info");
const tempMetric = document.getElementById("metric");
const daytimeImage = document.querySelector(".container__info-image");
const key = "KEiGR6Gd0rodktHWaPWghgxFESq6usGO";

async function getCity(city) {
  const response = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`
  );

  const data = await response.json();
  return data;
}

async function displayCondition(preData) {
  const cityCode = preData[0].Key;
  const response = await fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${key}`
  );
  const data = await response.json();
  return data;
}
