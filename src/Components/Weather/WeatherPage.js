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
  const {
    city,
    showSearchLoad,
    loading,
    error,
    errorMessage,
    getForecast
  } = props;

  const hasData = city && !loading;
  const searchLoading = showSearchLoad ? <SearchLoading /> : null;
  const load = loading ? <Loading /> : null;
  const errMessage = error ? (
    <Message type={"error"} text={errorMessage ? errorMessage : ""} />
  ) : null;

  const cityItems = city.map(city => (
    <CSSTransition timeout={500} key={city.key} classNames="transition">
      <WeatherCard city={city} getForecast={getForecast} key={city.key} />
    </CSSTransition>
  ));

  return (
    <div style={stylus.container} className="container">
      {searchLoading}
      <WeatherSearch />
      {load}
      {errMessage}
      <TransitionGroup>{hasData && cityItems}</TransitionGroup>
    </div>
  );
}

WeatherPage.propTypes = {
  city: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  showSearchLoad: PropTypes.bool.isRequired,
  getForecast: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

export default WeatherPage;
