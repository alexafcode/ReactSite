import React from "react";
import PropTypes from "prop-types";
import dayIcon from "../../assets/weather-icons/day.jpg";
import nightIcon from "../../assets/weather-icons/night.jpg";
import pressureIcon from "../../assets/weather-icons/icon-pressure.png";
import WeatherDetail from "./WeatherDetail"
import "./WeatherCard.scss";

function WeatherCard(props) {
  const icon = require(`../../assets/weather-icons/${props.city.WeatherIcon}.png`)

  const styles = {
    root: {
      backgroundImage: props.city.IsDayTime
        ? "url(" + dayIcon + ")"
        : "url(" + nightIcon + ")",
      backgroundSize: "cover",
      overflow: "hidden"
    },
    icon: {
      backgroundImage: "url(" + icon + ")"
    }
  };
  return (
    <div>
      <div className="card" style={styles.root}>
        <div className="card__title">
          <div className="card__title-time">{props.city.time}</div>
          <div className="card__title-location">
            {props.city.country}, {props.city.city}
          </div>
        </div>
        <div className="card__center">
          <div className="card__center-text">
            Сейчас:
          <div className="card__center-temp">{props.city.temp}</div>
            <div className="card__center-real">
              Ощущается как:
            <div className="card__center-val">
                {props.city.realFeelTemperature}
              </div>
            </div>
          </div>
          <div>
            <div className="card__center-icon" style={styles.icon} />
          </div>
          <div className="card__center-wind">
            <span className="card__center-direct">
              Направление ветра: {props.city.windDirect}
            </span>
            <div className="card__center-speed">
              Скорость ветра: {props.city.windSpeed}
            </div>
            <div className="card__center-pressure">
              <img src={pressureIcon} alt="pressure" />
              <span className="card__center-pressure-val">
                {props.city.pressure}
              </span>
            </div>
          </div>
        </div>
        <div className="card__footer">
          <button>Сохранить</button>
          {/* <button>Удалить</button> */}
          <div className="card__footer-text">
            <div>{props.city.weatherText}</div>
            <div>Видимость {props.city.visibility}</div>
          </div>
          <button className="card__footer-more" onClick={() => props.getForecast(props.city.key)}>На 5 дней</button>
        </div>
      </div>
      {props.showForecast &&
        <div className="card__datails" style={styles.root}>
          {props.forecastWeather.map((item, index) => (
            <WeatherDetail cityItem={item} key={`item-${index}`} />
          ))}
        </div>}
    </div>
  );
}

WeatherCard.propTypes = {
  city: PropTypes.object.isRequired,
  forecastWeather: PropTypes.array.isRequired
};
export default WeatherCard;
