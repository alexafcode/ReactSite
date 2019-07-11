import React from "react";
import { connect } from "react-redux";
import WeatherPage from "./WeatherPage";
import {
  fetchData,
  searchClick,
  searchPanelHide,
  getForecast
} from "../../store/weather/actions";

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
        getForecast={this.props.getForecast}
        error={this.props.error}
        errorMessage={this.props.errorMessage}
      />
    );
  }
  componentDidMount() {
    !this.props.city.length &&
      this.props.isAuthenticated &&
      this.props.fetchData();
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.AuthReducers.isAuthenticated,
    city: state.weatherRedusers.city,
    loading: state.weatherRedusers.loading,
    showSearchLoad: state.weatherRedusers.showSearchLoad,
    searchCities: state.weatherRedusers.searchCities,
    showSearchResult: state.weatherRedusers.showSearchResult,
    error: state.weatherRedusers.error,
    errorMessage: state.weatherRedusers.errorMessage
  };
};

const mapDispatchToProps = {
  fetchData,
  searchClick,
  searchPanelHide,
  getForecast
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherContainer);
