import React from "react";
import PropTypes from "prop-types";
import WeatherSearch from "./WeatherSearch";
import WeatherCard from "./WeatherCard";
import Loading from "../Layouts/Loading";
import SearchLoading from "../Layouts/SearchLoading";

function WeatherPage(props) {
  const stylus = {
    container: {
      textAlight: "center"
    }
  };

  return (
    <div style={stylus.container} className="container">
      {props.showSearchLoad && <SearchLoading />}
      <WeatherSearch
        searchCities={props.searchCities}
        showSearchLoad={props.showSearchLoad}
        showSearchResult={props.showSearchResult}
        searchClick={props.searchClick}
        searchPanelHide={props.searchPanelHide}
        getWeatherCity={props.getWeatherCity}
      />
      {props.loading && <Loading />}
      {props.city &&
        !props.loading &&
        props.city.map((city, index) => (
          <WeatherCard
            city={city}
            getForecast={props.getForecast}
            key={`item-${index}`}
          />
        ))}
    </div>
  );
}

WeatherPage.propTypes = {
  city: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  searchCities: PropTypes.array.isRequired,
  showSearchLoad: PropTypes.bool.isRequired,
  searchPanelHide: PropTypes.func.isRequired,
  showSearchResult: PropTypes.bool.isRequired,
  getForecast: PropTypes.func.isRequired
  // ToDo
};
export default WeatherPage;
