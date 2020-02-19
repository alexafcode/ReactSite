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
  componentDidMount() {
    !this.props.city.length &&
      this.props.isAuthenticated &&
      this.props.fetchData();
  }

  render() {
    const {
      city,
      loading,
      showSearchLoad,
      searchClick,
      searchCities,
      searchPanelHide,
      showSearchResult,
      getForecast,
      error,
      errorMessage
    } = this.props;

    return (
      <WeatherPage
        city={city}
        loading={loading}
        showSearchLoad={showSearchLoad}
        searchClick={searchClick}
        searchCities={searchCities}
        searchPanelHide={searchPanelHide}
        showSearchResult={showSearchResult}
        getForecast={getForecast}
        error={error}
        errorMessage={errorMessage}
      />
    );
  }
}

const mapStateToProps = ({ AuthReducers, weatherRedusers }) => {
  return {
    isAuthenticated: AuthReducers.isAuthenticated,
    city: weatherRedusers.city,
    loading: weatherRedusers.loading,
    showSearchLoad: weatherRedusers.showSearchLoad,
    searchCities: weatherRedusers.searchCities,
    showSearchResult: weatherRedusers.showSearchResult,
    error: weatherRedusers.error,
    errorMessage: weatherRedusers.errorMessage
  };
};

const mapDispatchToProps = {
  fetchData,
  searchClick,
  searchPanelHide,
  getForecast
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
