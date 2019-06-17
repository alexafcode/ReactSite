import React from "react";
import PropTypes from "prop-types";
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
  <div className="search-list__item" onClick={() => props.getWeather(props)}>
  {/* <div className="search-list__item" onClick={() => console.log(props)}> */}
    <div className="search-list__city">{props.city}</div>
    <div className="search-list__country">{props.country}</div>
  </div>
);

SearchList.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  keyCity: PropTypes.string.isRequired
};
export default SearchList;
