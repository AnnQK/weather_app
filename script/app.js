"use strict";

const cityInput = document.getElementById("city");
const submitBtn = document.querySelector(".btn");
const cityInfo = document.getElementById("city-info");
const conditionInfo = document.getElementById("condition-info");
const tempInfo = document.getElementById("temp-info");
const tempMetric = document.getElementById("metric");
const daytimeImage = document.querySelector(".container__info-image");
const key = "KEiGR6Gd0rodktHWaPWghgxFESq6usGO";

class UI {
  static updateCity(data) {
    cityInfo.textContent = data[0].LocalizedName;
  }

  static updateCondition(data) {
    conditionInfo.textContent = data[0].WeatherText;
  }

  static updateTemp(data) {
    tempInfo.textContent = data[0].Temperature.Metric.Value;
  }

  static updateDayTime(data) {
    data[0].IsDayTime
      ? (daytimeImage.style.background =
          '#fff url("../../assets/img/logo/day.png") no-repeat center')
      : (daytimeImage.style.background =
          '#495057 url("../../assets/img/logo/night.png") no-repeat center');
  }
}

async function getCity(city) {
  const response = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`
  );

  const data = await response.json();
  return data;
}

async function displayCondition(preData) {
  UI.updateCity(preData);
  const cityCode = preData[0].Key;
  const response = await fetch(
    `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${key}`
  );
  const data = await response.json();
  UI.updateCondition(data);
  UI.updateTemp(data);
  UI.updateDayTime(data);
  return data;
}

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // validation
  if (cityInput.value == "") {
    alert("Fill in city input");
  }
  getCity(cityInput.value).then((data) => displayCondition(data));
});
