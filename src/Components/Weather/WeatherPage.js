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

  test = () => {
    console.log(this.props)
  };

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
          // getWeather={this.getWeather}
        />
        {this.props.loading && <Loading />}
        {this.props.city &&
          !this.props.loading &&
          this.props.city.map((city, index) => (
            <WeatherCard city={city} key={`item-${index}`} />
          ))}
      </div>
    );
  }
}

WeatherPage.propTypes = {
  city: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  showSearchLoad: PropTypes.bool.isRequired,
  showSearchResult: PropTypes.bool.isRequired,
  // ToDo
};
