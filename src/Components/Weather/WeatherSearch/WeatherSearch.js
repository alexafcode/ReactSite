import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchClick, searchPanelHide } from "../../../store/weather/actions";
import { useState, useRef, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SearchList from "../SearchList";
import ClearIcon from "@material-ui/icons/Clear";
import "./WeatherSearch.scss";

function WeatherSearch(props) {
  const {
    searchCities,
    searchPanelHide,
    searchClick,
    showSearchResult,
  } = props;
  const initialState = "";
  const [input, setInput] = useState(initialState);

  const searchList = searchCities.map((item, index) => (
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

  const handleClickOutside = ({ target }) => {
    if (wrapperRef.current && !wrapperRef.current.contains(target)) {
      searchPanelHide();
    }
  };

  return (
    <div className="search">
      <Paper className="paper">
        <InputBase
          className="input"
          placeholder="Search City"
          inputProps={{ "aria-label": "Search" }}
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
        <ClearIcon onClick={() => setInput("")} />
        <IconButton
          className="icon"
          aria-label="Search"
          onClick={() => {
            if (input) searchClick(input);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <TransitionGroup>
        {showSearchResult && (
          <CSSTransition timeout={500} classNames="transition">
            <div className="result" ref={wrapperRef}>
              {searchList}
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

WeatherSearch.propTypes = {
  searchClick: PropTypes.func.isRequired,
  searchCities: PropTypes.array.isRequired,
  searchPanelHide: PropTypes.func.isRequired,
  showSearchResult: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ weatherRedusers }) => {
  return {
    showSearchLoad: weatherRedusers.showSearchLoad,
    searchCities: weatherRedusers.searchCities,
    showSearchResult: weatherRedusers.showSearchResult,
  };
};
const mapDispatchToProps = {
  searchClick,
  searchPanelHide,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherSearch);
