import React from "react";
import PropTypes from "prop-types";
import "./WeatherDetail.scss"

function WeatherDetail(props) {
  const dayIcon = require(`../../assets/weather-icons/${props.cityItem.dayIcon}.png`)
  const nightIcon = require(`../../assets/weather-icons/${props.cityItem.nightIcon}.png`)

  console.log("props", props)
  const styles= {
    dayIcon: {
      backgroundImage: "url(" + dayIcon + ")"
    },
    nightIcon: {
      backgroundImage: "url(" + nightIcon + ")"
    }
}
  return (
    <div className="detail">
      <div className="detail__date">{props.cityItem.date}</div>
      <div
        className="detail__day-icon" style={styles.dayIcon}
      ></div>
      <div className="detail__day-temp">Днём:</div>
      <div className="detail__day-value">{props.cityItem.tempDay}</div>
      <div
        className="detail__night-icon" style={styles.nightIcon}
      ></div>
      <div className="detail__night-temp">Ночью:</div>
      <div className="detail__night-value">{props.cityItem.tempNight}</div>
      <div className="detail__text">{props.cityItem.dayIconText}</div>
    </div>

  )
}

WeatherDetail.propTypes = {
  cityItem: PropTypes.object.isRequired
};
export default WeatherDetail;
