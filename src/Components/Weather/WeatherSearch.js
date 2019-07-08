import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchClick, searchPanelHide } from "../../store/weather/actions";
import { useState, useRef, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SearchList from "./SearchList";
import "./WeatherSearch.scss"

function WeatherSearch(props) {
  let initialState = "";
  const [input, setInput] = useState(initialState);

  const searchList = props.searchCities.map((item, index) => (
    <SearchList
      city={item.city}
      country={item.country}
      keyCity={item.keyCity}
      key={`item-${index}`}
    />
  ));

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      props.searchPanelHide();
    }
  };

  return (
    <div className="search">
      <Paper className="search__paper">
        <InputBase
        className="search__input"
          placeholder="Search City"
          inputProps={{ "aria-label": "Search" }}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <IconButton
          className="search__icon"
          aria-label="Search"
          onClick={() => {
            props.searchClick(input);
            // setInput(initialState);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <TransitionGroup>
        {props.showSearchResult && (
          <CSSTransition timeout={500} classNames="transition">
            <div className="search__result" ref={wrapperRef}>
              {searchList}
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

WeatherSearch.propTypes = {
  searchClick: PropTypes.array.isRequired,
  searchCities: PropTypes.array.isRequired,
  searchPanelHide: PropTypes.func.isRequired,
  showSearchResult: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    showSearchLoad: state.weatherRedusers.showSearchLoad,
    searchCities: state.weatherRedusers.searchCities,
    showSearchResult: state.weatherRedusers.showSearchResult,
  };
};
const mapDispatchToProps = {
  searchClick,
  searchPanelHide
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeatherSearch);
