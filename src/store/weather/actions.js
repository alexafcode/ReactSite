import axios from "axios";
import keys from "../../keys";
// import { getWeatherForCity, isSaveCity, getCityFromLS } from "./helperActions";
import { isSaveCity, getCityFromLS } from "./helperActions";

import {
  getWeather,
  getForecastForCity,
  getWeatherForCity,
  transformCity
} from "../../api/weather-api";

export const FETCH_DATA = "FETCH_DATA";
export const CITY_IS_LOADING = "CITY_IS_LOADING";
export const SEARCH_CLICK = "SEARCH_CLICK";
export const SEARCH_CITY = "SEARCH_CITY";
export const SHOW_SEARCH_RESULT = "SHOW_SEARCH_RESULT";
export const SHOW_FORECAST = "SHOW_FORECAST";
export const FORECAST_WEATHER = "FORECAST_WEATHER";
export const ERROR_FETCH_DATA = "ERROR_FETCH_DATA";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

export const key = keys.weather;
export const startUrl = "https://dataservice.accuweather.com";

export const fetchData = () => async dispatch => {
  let cityFromLS = [];
  if (isSaveCity()) {
    cityFromLS = getCityFromLS();
    cityFromLS.forEach(async el => {
      try {
        const city = await getWeather(el);
        dispatch({ type: ERROR_FETCH_DATA, payload: false });
        dispatch({ type: FETCH_DATA, payload: city });
      } catch (e) {
        console.error("Error Fetch", e);
      }
    });
  }
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const latitude = coords.latitude;
      const longitude = coords.longitude;
      getWeather(latitude, longitude)
        .then(city => {
          dispatch({ type: FETCH_DATA, payload: city });
        })
        .catch(error => {
          console.error("Erorr", error.message);
          dispatch({ type: ERROR_FETCH_DATA, payload: true });
          dispatch({ type: ERROR_MESSAGE, payload: error.message });
        });
    });
  } else {
    dispatch({ type: CITY_IS_LOADING, payload: false });
  }
};

export const searchClick = input => dispatch => {
  input = input.trim();
  dispatch({ type: ERROR_FETCH_DATA, payload: false });
  dispatch({ type: SEARCH_CLICK, payload: true });
  const url = `${startUrl}/locations/v1/cities/autocomplete?apikey=${key}&q=${input}&language=ru-ru`;
  let items = [];
  let cities = {};
  axios
    .get(url)
    .then(response => {
      if (response.data.length > 0) {
        items = response.data.map(el => {
          return {
            country: el.Country.LocalizedName,
            city: el.LocalizedName,
            keyCity: el.Key
          };
        });
      } else {
        cities = {
          city: "Ничего не найдено"
        };
        items.push(cities);
      }
      dispatch({ type: SEARCH_CITY, payload: items });
      dispatch({ type: SEARCH_CLICK, payload: false });
      dispatch({ type: SHOW_SEARCH_RESULT, payload: true });
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: SEARCH_CLICK, payload: false });
      dispatch({ type: ERROR_FETCH_DATA, payload: true });
      dispatch({ type: ERROR_MESSAGE, payload: error.message });
    });
};

export const searchPanelHide = () => dispatch => {
  dispatch({ type: SHOW_SEARCH_RESULT, payload: false });
};

export const getWeatherCity = d => async dispatch => {
  const data = { ...d };
  data["Key"] = d.keyCity;
  const res = await getWeatherForCity(data);
  const names = {
    cityName: d.city,
    countryName: d.country
  };
  const city = transformCity(res, names);
  dispatch({ type: FETCH_DATA, payload: city });
  dispatch({ type: SHOW_SEARCH_RESULT, payload: false });
  return city;
};

export const getForecast = queryKey => dispatch => {
  getForecastForCity(queryKey)
    .then(arr => {
      dispatch({ type: FORECAST_WEATHER, payload: arr });
      return arr;
    })
    .catch(e => console.error(e.message));
};
