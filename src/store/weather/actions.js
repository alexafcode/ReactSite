import axios from "axios";
import keys from "../../keys";
import { getWeatherForCity } from "./helperActions";
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
  let arr = [];
  if (localStorage.getItem("city") != null) {
    try {
      arr = JSON.parse(localStorage.getItem("city"));
    } catch (e) {
      return console.error(e);
    }
    arr.forEach(async el => {
      try {
        const city = await getWeatherForCity(el);
        dispatch({ type: ERROR_FETCH_DATA, payload: false });
        dispatch({ type: FETCH_DATA, payload: city });
        dispatch({ type: CITY_IS_LOADING, payload: false });
      } catch (e) {
        console.error("Error Fetch", e);
      }
    });
  }
  // ToDo Compare key LS and position
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const baseUrl = `${startUrl}/locations/v1/cities/geoposition/search?apikey=${key}&q=${latitude},${longitude}&language=ru-ru`;
        axios
          .get(baseUrl)
          .then(async response => {
            // ToDo
            const data = response.data;
            try {
              const city = await getWeatherForCity(data);
              dispatch({ type: FETCH_DATA, payload: city });
              dispatch({ type: CITY_IS_LOADING, payload: false });
            } catch (e) {
              console.error("Error Fetch", e);
            }
          })
          .catch(error => {
            console.error("Erorr", error.message);
            dispatch({ type: CITY_IS_LOADING, payload: false });
            dispatch({ type: ERROR_FETCH_DATA, payload: true });
            dispatch({ type: ERROR_MESSAGE, payload: error.message });
          });
        //ToDo error
      },
      () => {
        dispatch({ type: CITY_IS_LOADING, payload: false });
        console.log("Cancel Geoposition");
      }
    );
  } else {
    // Geolocation is not Supported
    dispatch({ type: CITY_IS_LOADING, payload: false });
    console.log("Geolocation is not Supported");
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

export const getWeatherCity = data => dispatch => {
  const url = `${startUrl}/currentconditions/v1/${data.keyCity}?apikey=${key}&language=ru-ru&details=true`;
  let city = {};
  axios
    .get(url)
    .then(result => {
      const res = result.data[0];
      const time = new Date(res.LocalObservationDateTime).toLocaleString("ru", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      city = {
        fromLS: data.fromLS ? true : false,
        key: data.keyCity,
        city: data.city,
        country: data.country,
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
      dispatch({ type: FETCH_DATA, payload: city });
      dispatch({ type: SHOW_SEARCH_RESULT, payload: false });
      return city;
    })
    .catch(error => console.error(error.message));
  dispatch({ type: SHOW_SEARCH_RESULT, payload: false });
};

export const getForecast = queryKey => dispatch => {
  let arr = [];
  const url = `${startUrl}/forecasts/v1/daily/5day/${queryKey}?apikey=${key}&language=ru-ru&metric=true`;
  axios
    .get(url)
    .then(result => {
      const res = result.data.DailyForecasts;
      arr = res.map(el => {
        return {
          key: queryKey,
          date: new Date(el.Date).toLocaleString("ru", {
            day: "numeric",
            month: "long"
          }),
          weekday: new Date(el.Date).toLocaleString("ru", {
            weekday: "long"
          }),
          dayIcon: el.Day.Icon,
          dayIconText: el.Day.IconPhrase,
          tempDay: `${el.Temperature.Maximum.Value.toFixed()} ° C`,
          nightIcon: el.Night.Icon,
          tempNight: `${el.Temperature.Minimum.Value.toFixed()} ° C`
        };
      });
      dispatch({ type: FORECAST_WEATHER, payload: arr });
    })
    .catch(error => console.error(error.message));
  return arr;
};
