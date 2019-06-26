import React from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
import WeatherPage from "./WeatherPage";
import {
  fetchData,
  searchClick,
  searchPanelHide,
  getForecast
} from "../../store/weather/actions";

class WeatherContainer extends React.Component {
  render() {
    // if (!this.props.isAuthenticated) {
    //   return <Redirect to="/signin" />;
    // }
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
      />
    );
  }
  componentDidMount() {
    !this.props.city.lengt && this.props.isAuthenticated && this.props.fetchData();
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.AuthReducers.isAuthenticated,
    city: state.weatherRedusers.city,
    loading: state.weatherRedusers.loading,
    showSearchLoad: state.weatherRedusers.showSearchLoad,
    searchCities: state.weatherRedusers.searchCities,
    showSearchResult: state.weatherRedusers.showSearchResult
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
