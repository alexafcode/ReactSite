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

  return (
    <div style={stylus.container} className="container">
      {showSearchLoad && <SearchLoading />}
      <WeatherSearch />
      {loading && <Loading />}
      {error && (
        <Message type={"error"} text={errorMessage ? errorMessage : ""} />
      )}
      <TransitionGroup>
        {city &&
          !loading &&
          city.map((city, index) => (
            <CSSTransition timeout={500} key={index} classNames="transition">
              <WeatherCard
                city={city}
                getForecast={getForecast}
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
