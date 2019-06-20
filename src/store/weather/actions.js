import axios from "axios";
export const FETCH_DATA = "FETCH_DATA";
export const CITY_IS_LOADING = "CITY_IS_LOADING";
export const SEARCH_CLICK = "SEARCH_CLICK";
export const SEARCH_CITY = "SEARCH_CITY";
export const SHOW_SEARCH_RESULT = "SHOW_SEARCH_RESULT";
export const SHOW_FORECAST = "SHOW_FORECAST";
export const FORECAST_WEATHER = "FORECAST_WEATHER";

const key = "";

export const fetchData = () => async (dispatch) => {
  let arr = [];
  if (localStorage.getItem("city") != null) {
    try {
      arr = JSON.parse(localStorage.getItem("city"));
    } catch (e) {
      return console.error(e)
    }
    arr.forEach(async (el) => {
      try {
        const city = await getWeatherForCity(el)
        dispatch({ type: FETCH_DATA, payload: city });
        dispatch({ type: CITY_IS_LOADING, payload: false });
      } catch (e) {
        console.error("Error Fetch", e)
      }
    });
  }
  // ToDo Compare key LS and position
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const baseUrl = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${latitude},${longitude}&language=ru-ru`;
        axios
          .get(baseUrl)
          .then(async (response) => {
            // ToDo
            console.log(response.data);
            const data = response.data;
            try {
              const city = await getWeatherForCity(data)
              console.log("city", city)
              dispatch({ type: FETCH_DATA, payload: city });
              dispatch({ type: CITY_IS_LOADING, payload: false });
            } catch (e) {
              console.error("Error Fetch", e)
            }
          })
          .catch(error => console.error("Erorr", error.message));
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
  dispatch({ type: SEARCH_CLICK, payload: true });
  const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${input}&language=ru-ru`;
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
    });
};

export const searchPanelHide = () => dispatch => {
  dispatch({ type: SHOW_SEARCH_RESULT, payload: false });
};

export const getWeatherCity = (data) => dispatch => {
  const url = `https://dataservice.accuweather.com/currentconditions/v1/${data.keyCity}?apikey=${key}&language=ru-ru&details=true`;
  let city = {};
  axios
    .get(url)
    .then(result => {
      const res = result.data[0];
      const time = new Date(
        res.LocalObservationDateTime
      ).toLocaleString("ru", {
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
        windSpeed: `${res.Wind.Speed.Metric.Value}  ${
          res.Wind.Speed.Metric.Unit
          }`,
        weatherText: res.WeatherText,
        realFeelTemperature: `${res.RealFeelTemperature.Metric.Value.toFixed()}° ${
          res.RealFeelTemperature.Metric.Unit
          }`,
        visibility: `${res.Visibility.Metric.Value} ${
          res.Visibility.Metric.Unit
          }`,
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
}

export const getForecast = (queryKey) => dispatch => {
  let arr = [];
  const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${
    queryKey
    }?apikey=${key}&language=ru-ru&metric=true`;
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
}
export const saveToLS = (data) => dispatch => {
  let arr = [];
  let exist = false;
  let city = {};
  if (localStorage.getItem("city") != null) {
    try {
      arr = JSON.parse(localStorage.getItem("city"));
    } catch (e) {
      return console.error(e)
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
    // ToDo dispatch
  }
}

export const deleteToLS = (data) => dispatch => {
  let arr = [];
  if (localStorage.getItem("city") != null) {
    try {
      arr = JSON.parse(localStorage.getItem("city"));
    } catch (e) {
      return console.error(e)
    }
    let filteredArr = arr.filter(el => el.Key != data.key);
    localStorage.setItem("city", JSON.stringify(filteredArr));
    // ToDo dispatch
  }
}


async function getWeatherForCity(data) {
  console.log("data", data)
  let city = {};
  const queryKey = data.Key ? data.Key : data.selectCity.Key;
  const url = `https://dataservice.accuweather.com/currentconditions/v1/${queryKey}?apikey=${key}&language=ru-ru&details=true`;
  await axios
    .get(url)
    .then(result => {
      const res = result.data[0];
      console.log(res);
      const cityName = data.ParentCity
        ? data.ParentCity.LocalizedName
        : data.LocalizedName;
      const time = new Date(
        res.LocalObservationDateTime
      ).toLocaleString("ru", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      city = {
        fromLS: data.fromLS ? true : false,
        key: queryKey,
        city: data.city ? data.city : cityName,
        country: data.Country
          ? data.Country.LocalizedName
          : data.country,
        temp: `${res.Temperature.Metric.Value.toFixed()}°  ${
          res.Temperature.Metric.Unit
          }`,
        windDirect: res.Wind.Direction.Localized,
        windSpeed: `${res.Wind.Speed.Metric.Value}  ${
          res.Wind.Speed.Metric.Unit
          }`,
        weatherText: res.WeatherText,
        realFeelTemperature: `${res.RealFeelTemperature.Metric.Value.toFixed()}° ${
          res.RealFeelTemperature.Metric.Unit
          }`,
        visibility: `${res.Visibility.Metric.Value} ${
          res.Visibility.Metric.Unit
          }`,
        WeatherIcon: res.WeatherIcon,
        IsDayTime: res.IsDayTime,
        time: time,
        pressure: `${res.Pressure.Metric.Value} мм рт. ст.`
      };
    }).catch(error => console.error(error.message));
  return city;
}

