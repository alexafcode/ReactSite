import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayIcon from "../../../assets/weather-icons/day.jpg";
import nightIcon from "../../../assets/weather-icons/night.jpg";
import pressureIcon from "../../../assets/weather-icons/icon-pressure.png";
import WeatherDetail from "../WeatherDetail";
import { saveToLS, deleteToLS } from "../../../store/weather/helperActions";
import "./WeatherCard.scss";

class WeatherCard extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      save: false
    };
  }
  componentDidMount() {
    this.setState((state, props) => {
      return { save: props.city.fromLS };
    });
  }
  render() {
    const { city, forecastWeather, getForecast } = this.props;
    const icon = require(`../../../assets/weather-icons/${city.WeatherIcon}.png`);

    const styles = {
      root: {
        backgroundImage: city.IsDayTime
          ? `url(${dayIcon})`
          : `url(${nightIcon})`,
        backgroundSize: "cover",
        overflow: "hidden"
      },
      icon: {
        backgroundImage: `url(${icon})`
      }
    };

    const showForecast = () => {
      if (!this.state.clicked) {
        if (forecastWeather.length === 0) {
          getForecast(city.key);
        }
        this.setState({ clicked: true });
      } else {
        this.setState({ clicked: false });
      }
    };

    const saveLS = () => {
      if (!this.state.save) {
        saveToLS(city);
        this.setState(state => {
          return { save: !state.save };
        });
      } else {
        deleteToLS(city);
        this.setState(state => {
          return { save: !state.save };
        });
      }
    };

    return (
      <div className="card__container">
        <div className="card" style={styles.root}>
          <div className="title">
            <div className="title-time">{city.time}</div>
            <div className="title-location">
              {city.country}, {city.city}
            </div>
          </div>
          <div className="center">
            <div className="center-text">
              Сейчас:
              <div className="center-temp">{city.temp}</div>
              <div className="center-real">
                Ощущается как:
                <div className="center-val">{city.realFeelTemperature}</div>
              </div>
            </div>
            <div>
              <div className="center-icon" style={styles.icon} />
            </div>
            <div className="center-wind">
              <span className="center-direct">
                Направление ветра: {city.windDirect}
              </span>
              <div className="center-speed">
                Скорость ветра: {city.windSpeed}
              </div>
              <div className="center-pressure">
                <img src={pressureIcon} alt="pressure" />
                <span className="center-pressure-val">{city.pressure}</span>
              </div>
            </div>
          </div>
          <div className="footer">
            <button onClick={() => saveLS()}>
              {!this.state.save ? "Сохранить" : "Удалить"}
            </button>
            <div className="footer-text">
              <div>{city.weatherText}</div>
              <div>Видимость {city.visibility}</div>
            </div>
            <button className="footer-more" onClick={() => showForecast()}>
              На 5 дней
            </button>
          </div>
        </div>
        {this.state.clicked && (
          <div className="datails" style={styles.root}>
            {forecastWeather.map((item, index) => (
              <WeatherDetail cityItem={item} key={`item-${index}`} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

WeatherCard.propTypes = {
  city: PropTypes.object.isRequired
};

const mapStateToProps = (state, { city }) => {
  return {
    forecastWeather: state.weatherRedusers.forecastWeather.filter(
      el => el.key === city.key
    )
  };
};

export default connect(mapStateToProps, null)(WeatherCard);
