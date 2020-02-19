import axios from "axios";
import { key, startUrl } from "./actions";

export const isSaveCity = () => {
  if (localStorage.getItem("city")) {
    return true;
  } else {
    return false;
  }
};

export const getCityFromLS = () => {
  try {
    return JSON.parse(localStorage.getItem("city"));
  } catch (e) {
    return console.error(e);
  }
};

export const saveToLS = data => {
  let arr = [];
  let exist = false;
  let city = {};
  if (localStorage.getItem("city") != null) {
    try {
      arr = JSON.parse(localStorage.getItem("city"));
    } catch (e) {
      return console.error(e);
    }
    if (arr.some(e => e.Key === data.key)) {
      exist = true;
    }
  }
  if (!exist) {
    city = {
      Key: data.key,
      city: data.city,
      country: data.country,
      fromLS: true
    };
    arr.push(city);
    localStorage.setItem("city", JSON.stringify(arr));
  }
};

export const deleteToLS = data => {
  let arr = [];
  if (localStorage.getItem("city") != null) {
    try {
      arr = JSON.parse(localStorage.getItem("city"));
    } catch (e) {
      return console.error(e);
    }
    let filteredArr = arr.filter(el => el.Key != data.key);
    localStorage.setItem("city", JSON.stringify(filteredArr));
  }
};

export async function getWeatherForCity(data) {
  let city = {};
  const queryKey = data.Key ? data.Key : data.selectCity.Key;
  const url = `${startUrl}/currentconditions/v1/${queryKey}?apikey=${key}&language=ru-ru&details=true`;
  await axios
    .get(url)
    .then(result => {
      const res = result.data[0];
      const cityName = data.ParentCity
        ? data.ParentCity.LocalizedName
        : data.LocalizedName;
      const time = new Date(res.LocalObservationDateTime).toLocaleString("ru", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      city = {
        fromLS: data.fromLS ? true : false,
        key: queryKey,
        city: data.city ? data.city : cityName,
        country: data.Country ? data.Country.LocalizedName : data.country,
        temp: `${res.Temperature.Metric.Value.toFixed()}°  ${
          res.Temperature.Metric.Unit
        }`,
        windDirect: res.Wind.Direction.Localized,
        windSpeed: `${res.Wind.Speed.Metric.Value}  ${res.Wind.Speed.Metric.Unit}`,
        weatherText: res.WeatherText,
        realFeelTemperature: `${res.RealFeelTemperature.Metric.Value.toFixed()}° ${
          res.RealFeelTemperature.Metric.Unit
        }`,
        visibility: `${res.Visibility.Metric.Value} ${res.Visibility.Metric.Unit}`,
        WeatherIcon: res.WeatherIcon,
        IsDayTime: res.IsDayTime,
        time: time,
        pressure: `${res.Pressure.Metric.Value} мм рт. ст.`
      };
    })
    .catch(error => console.error(error.message));
  return city;
}
