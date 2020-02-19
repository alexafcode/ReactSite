import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getWeatherCity } from "../../../store/weather/actions";
import "./SearchList.scss";

const SearchList = props => {
  const { city, country, getWeatherCity } = props;
  return (
    <div className="search-list" onClick={() => getWeatherCity(props)}>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
    </div>
  );
};

SearchList.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string,
  keyCity: PropTypes.string.isRequired,
  getWeatherCity: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getWeatherCity
};

export default connect(null, mapDispatchToProps)(SearchList);
