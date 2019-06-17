import React from "react";
import PropTypes from "prop-types";
import WeatherSearch from "./WeatherSearch";
import WeatherCard from "./WeatherCard";
import Loading from "../Layouts/Loading";
import SearchLoading from "../Layouts/SearchLoading";

export default class WeatherPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {
  //   this.props.fetchData();
  // }

  render() {
    const stylus = {
      container: {
        textAlight: "center"
      }
    };

    return (
      <div style={stylus.container} className="container">
        {/* <button onClick={this.test}>tets</button> */}
        {this.props.showSearchLoad && <SearchLoading />}
        <WeatherSearch
          searchCities={this.props.searchCities}
          showSearchLoad={this.props.showSearchLoad}
          showSearchResult={this.props.showSearchResult}
          searchClick={this.props.searchClick}
          searchPanelHide={this.props.searchPanelHide}
          getWeatherCity={this.props.getWeatherCity}
        />
        {this.props.loading && <Loading />}
        {this.props.city &&
          !this.props.loading &&
          this.props.city.map((city, index) => (
            <WeatherCard city={city} showForecast={this.props.showForecast} forecastWeather={this.props.forecastWeather} getForecast={this.props.getForecast} key={`item-${index}`} />
          ))}
      </div>
    );
  }
}

WeatherPage.propTypes = {
  city: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  searchCities: PropTypes.array.isRequired,
  showSearchLoad: PropTypes.bool.isRequired,
  searchPanelHide: PropTypes.func.isRequired,
  showSearchResult: PropTypes.bool.isRequired,
  forecastWeather: PropTypes.array.isRequired,
  showForecast: PropTypes.bool.isRequired,
  getForecast: PropTypes.func.isRequired
  // ToDo
};
