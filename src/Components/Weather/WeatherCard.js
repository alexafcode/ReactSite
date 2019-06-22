import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayIcon from "../../assets/weather-icons/day.jpg";
import nightIcon from "../../assets/weather-icons/night.jpg";
import pressureIcon from "../../assets/weather-icons/icon-pressure.png";
import WeatherDetail from "./WeatherDetail";
import { saveToLS } from "../../store/weather/helperActions";
import { deleteToLS } from "../../store/weather/helperActions";
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
    const icon = require(`../../assets/weather-icons/${
      this.props.city.WeatherIcon
      }.png`);

    const styles = {
      root: {
        backgroundImage: this.props.city.IsDayTime
          ? "url(" + dayIcon + ")"
          : "url(" + nightIcon + ")",
        backgroundSize: "cover",
        overflow: "hidden"
      },
      icon: {
        backgroundImage: "url(" + icon + ")"
      }
    };

    const showForecast = () => {
      if (!this.state.clicked) {
        if (this.props.forecastWeather.length === 0) {
          this.props.getForecast(this.props.city.key);
        }
        this.setState({ clicked: true });
      } else {
        this.setState({ clicked: false });
      }
    };

    const saveLS = () => {
      if (!this.state.save) {
        saveToLS(this.props.city)
        this.setState(state => {
          return { save: !state.save };
        });
      } else {
        deleteToLS(this.props.city)
        this.setState(state => {
          return { save: !state.save };
        });
      }
    };

    return (
      <div className="card__cantainer">
        <div className="card" style={styles.root}>
          <div className="card__title">
            <div className="card__title-time">{this.props.city.time}</div>
            <div className="card__title-location">
              {this.props.city.country}, {this.props.city.city}
            </div>
          </div>
          <div className="card__center">
            <div className="card__center-text">
              Сейчас:
              <div className="card__center-temp">{this.props.city.temp}</div>
              <div className="card__center-real">
                Ощущается как:
                <div className="card__center-val">
                  {this.props.city.realFeelTemperature}
                </div>
              </div>
            </div>
            <div>
              <div className="card__center-icon" style={styles.icon} />
            </div>
            <div className="card__center-wind">
              <span className="card__center-direct">
                Направление ветра: {this.props.city.windDirect}
              </span>
              <div className="card__center-speed">
                Скорость ветра: {this.props.city.windSpeed}
              </div>
              <div className="card__center-pressure">
                <img src={pressureIcon} alt="pressure" />
                <span className="card__center-pressure-val">
                  {this.props.city.pressure}
                </span>
              </div>
            </div>
          </div>
          <div className="card__footer">
            <button onClick={() => saveLS()}>
              {!this.state.save ? "Сохранить" : "Удалить"}
            </button>
            <div className="card__footer-text">
              <div>{this.props.city.weatherText}</div>
              <div>Видимость {this.props.city.visibility}</div>
            </div>
            <button
              className="card__footer-more"
              onClick={() => showForecast()}
            >
              На 5 дней
            </button>
          </div>
        </div>
        {this.state.clicked && (
          <div className="card__datails" style={styles.root}>
            {this.props.forecastWeather.map((item, index) => (
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

const mapStateToProps = (state, props) => {
  return {
    forecastWeather: state.weatherRedusers.forecastWeather.filter(
      city => city.key == props.city.key
    )
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCard);
