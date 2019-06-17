import React from "react";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SearchList from "./SearchList";

const useStyles = makeStyles({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "auto",
    marginTop: 1 + "rem"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  searchList: {
    left: 0,
    right: 0,
    zIndex: 1,
    width: 20 + "%",
    overflow: "auto",
    cursor: "pointer",
    marginTop: 0.25 + "rem",
    marginLeft: "auto",
    marginRight: "auto",
    position: "absolute",
    backgroundColor: "whitesmoke"
  }
});

function WeatherSearch(props) {
  const [input, setInput] = useState("");
  const classes = useStyles();

  const searchList = props.searchCities.map((item, index) => (
    <SearchList
      city={item.city}
      country={item.country}
      keyCity={item.keyCity}
      getWeather={props.getWeather}
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
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search City"
          inputProps={{ "aria-label": "Search" }}
          onChange={e => setInput(e.target.value)}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          onClick={() => props.searchClick(input)}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {props.showSearchResult && (
        <div className={classes.searchList} ref={wrapperRef}>
          {searchList}
        </div>
      )}
      {/* {props.showSearchResult && ( */}
      {/* <div className={classes.searchList} ref={wrapperRef}>
          {props.searchCities &&
            props.searchCities.map((item, index) => (
              <SearchList
                city={item.city}
                country={item.country}
                keyCity={item.keyCity}
                key={`item-${index}`}
              />
            ))}
        </div> */}
    </div>
  );
}

WeatherSearch.propTypes = {
  searchCities: PropTypes.array.isRequired,
  searchPanelHide: PropTypes.func.isRequired
  // ToDo
};

export default WeatherSearch;
