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
  const dayPng = require(`../../assets/weather-icons/${dayIcon}.png`);
  const nightPng = require(`../../assets/weather-icons/${nightIcon}.png`);

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
      <div className="detail__date">{date}</div>
      <div className="detail__date">{weekday}</div>
      <div className="detail__day-icon" style={styles.dayIcon}></div>
      <div className="detail__day-temp">Днём:</div>
      <div className="detail__day-value">{tempDay}</div>
      <div className="detail__night-icon" style={styles.nightIcon}></div>
      <div className="detail__night-temp">Ночью:</div>
      <div className="detail__night-value">{tempNight}</div>
      <div className="detail__text">{dayIconText}</div>
    </div>
  );
}

WeatherDetail.propTypes = {
  cityItem: PropTypes.object.isRequired
};
export default WeatherDetail;
