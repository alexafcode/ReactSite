import keys from "../keys";

const _startUrl = "https://dataservice.accuweather.com";
const _key = keys.weather;

const getResource = async url => {
  const res = await fetch(`${_startUrl}${url}`, { mode: "no-cors" });
  if (!res.ok) {
    throw new Error(`Could not fetch ${url} , received ${res.status}`);
  }
  return await res.json();
};

export async function getWeather(latitude, longitude) {
  const url = `/locations/v1/cities/geoposition/search?apikey=${_key}&q=${latitude},${longitude}&language=ru-ru`;
  const json = await getResource(url);
  const names = {
    cityName: json.ParentCity
      ? json.ParentCity.LocalizedName
      : json.LocalizedName,
    countryName: json.Country ? json.Country.LocalizedName : json.country
  };
  const cityData = await getWeatherForCity(json);
  return transformCity(cityData, names);
}

async function getWeatherForCity(data) {
  const queryKey = data.Key ? data.Key : data.selectCity.Key;
  const url = `/currentconditions/v1/${queryKey}?apikey=${_key}&language=ru-ru&details=true`;
  const json = await getResource(url);
  const item = {
    data: json[0],
    queryKey
  };
  return item;
}

function transformCity(data, city) {
  const { res, queryKey } = data;
  const time = new Date(res.LocalObservationDateTime).toLocaleString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return {
    // fromLS: data.fromLS ? true : false,
    key: queryKey,
    city: city.cityName,
    country: city.countryName,
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
}
export async function getForecastForCity(queryKey) {
  const url = `/forecasts/v1/daily/5day/${queryKey}?apikey=${_key}&language=ru-ru&metric=true`;
  const result = await getResource(url);
  const res = result.data.DailyForecasts;
  return res.map(el => {
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
}
