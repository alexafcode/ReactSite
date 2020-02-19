import React from "react";
import PropTypes from "prop-types";
import "./WeatherDetail.scss";

function WeatherDetail({ cityItem }) {
  const {
    dayIcon,
    nightIcon,
    date,
    weekday,
    tempDay,
    tempNight,
    dayIconText
  } = cityItem;
  const dayPng = require(`../../../assets/weather-icons/${dayIcon}.png`);
  const nightPng = require(`../../../assets/weather-icons/${nightIcon}.png`);

  const styles = {
    dayIcon: {
      backgroundImage: `url(${dayPng})`
    },
    nightIcon: {
      backgroundImage: `url(${nightPng})`
    }
  };
  return (
    <div className="detail">
      <div className="date">{date}</div>
      <div className="week">{weekday}</div>
      <div className="day-icon" style={styles.dayIcon}></div>
      <div className="day-temp">Днём:</div>
      <div className="day-value">{tempDay}</div>
      <div className="night-icon" style={styles.nightIcon}></div>
      <div className="night-temp">Ночью:</div>
      <div className="night-value">{tempNight}</div>
      <div className="text">{dayIconText}</div>
    </div>
  );
}

WeatherDetail.propTypes = {
  cityItem: PropTypes.object.isRequired
};
export default WeatherDetail;
