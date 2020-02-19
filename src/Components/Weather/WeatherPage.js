import React from "react";
import PropTypes from "prop-types";
import WeatherSearch from "./WeatherSearch";
import WeatherCard from "./WeatherCard";
import Loading from "../Layouts/Loading";
import SearchLoading from "../Layouts/SearchLoading";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Message from "../Layouts/Message";
import "../Layouts/Animate.scss";

function WeatherPage(props) {
  const stylus = {
    container: {
      textAlight: "center"
    }
  };

  return (
    <div style={stylus.container} className="container">
      {props.showSearchLoad && <SearchLoading />}
      <WeatherSearch />
      {props.loading && <Loading />}
      {props.error && (
        <Message
          type={"error"}
          text={props.errorMessage ? props.errorMessage : ""}
        />
      )}
      <TransitionGroup>
        {props.city &&
          !props.loading &&
          props.city.map((city, index) => (
            <CSSTransition timeout={500} key={index} classNames="transition">
              <WeatherCard
                city={city}
                getForecast={props.getForecast}
                key={`item-${index}`}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
}

WeatherPage.propTypes = {
  city: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  showSearchLoad: PropTypes.bool.isRequired,
  getForecast: PropTypes.func.isRequired
  // ToDo
};

export default WeatherPage;
