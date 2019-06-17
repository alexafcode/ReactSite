import React from "react";
import { connect } from "react-redux";
import WeatherPage from "./WeatherPage";
import { fetchData, searchClick, searchPanelHide, getWeatherCity, getForecast } from "../../store/weather/actions";

class WeatherContainer extends React.Component {
  render() {
    return (
      <WeatherPage
        city={this.props.city}
        loading={this.props.loading}
        showSearchLoad={this.props.showSearchLoad}
        searchClick={this.props.searchClick}
        searchCities={this.props.searchCities}
        searchPanelHide={this.props.searchPanelHide}
        showSearchResult={this.props.showSearchResult}
        getWeatherCity={this.props.getWeatherCity}
        showForecast={this.props.showForecast}
        forecastWeather={this.props.forecastWeather}
        getForecast={this.props.getForecast}
      />
    );
  }
  componentDidMount() {
    if (!this.props.city.length) {
      this.props.fetchData();
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    city: state.weatherRedusers.city,
    loading: state.weatherRedusers.loading,
    showSearchLoad: state.weatherRedusers.showSearchLoad,
    searchCities: state.weatherRedusers.searchCities,
    showSearchResult: state.weatherRedusers.showSearchResult,
    showForecast: state.weatherRedusers.showForecast,
    forecastWeather: state.weatherRedusers.forecastWeather
  };
};

const mapDispatchToProps = {
  fetchData,
  searchClick,
  searchPanelHide,
  getWeatherCity,
  getForecast
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherContainer);
