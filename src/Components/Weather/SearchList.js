import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getWeatherCity } from "../../store/weather/actions";
import "./SearchList.scss";

// const styles = {
//   item: {
//     ':hover': {
//       fontWeight: "bold",
//       color: 'grey'
//     }
//   }
// }

const SearchList = props => (
  <div className="search-list__item" onClick={() => props.getWeatherCity(props)}>
    <div className="search-list__city">{props.city}</div>
    <div className="search-list__country">{props.country}</div>
  </div>
);

SearchList.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string,
  keyCity: PropTypes.string.isRequired,
  getWeatherCity: PropTypes.func.isRequired
};


const mapDispatchToProps = {
  getWeatherCity
};

export default connect(
  null,
  mapDispatchToProps
)(SearchList);

