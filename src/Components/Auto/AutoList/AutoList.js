import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import AutoCard from "./AutoCard";
import AutoFilter from "./AutoFilter";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import Fab from "@material-ui/core/Fab";
import Hidden from "@material-ui/core/Hidden";
import "./AutoList.scss";

const theme = createMuiTheme();

function AutoList(props) {
  const [state, setState] = useState({
    offset: 0,
    limit: 4,
    to: 4,
    visible: false
  });

  const handleClick = (offset, page) => {
    const to = page * state.limit;
    setState({ ...state, offset, to });
    window.scrollTo({
      top: 0
    });
  };

  const goToFirstPage = () => {
    setState({ ...state, offset: 0, to: state.limit });
  };

  const changeLimit = limit => {
    setState({ ...state, limit, to: limit, offset: 0 });
  };

  const toggleDrawer = () => {
    setState({ ...state, visible: !state.visible });
  };

  const uniqAuto = () => {
    if (props.cars) {
      const setAuto = [...new Set(props.cars.map(a => a.manufacturer))];
      const arrSet = Array.from(setAuto);
      return arrSet;
    }
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  });

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      toggleDrawer();
    }
  };

  return (
    <div className="autolist">
      <div className="filter__mobile">
        <Fab
          color="primary"
          aria-label="Add"
          size="small"
          onClick={toggleDrawer}
        >
          <OpenInBrowser />
        </Fab>
        <Hidden only={["md", "xl", "lg"]}>
          <div
            style={{ visibility: !state.visible ? "hidden" : "visible" }}
            ref={wrapperRef}
          >
            <AutoFilter
              filters={uniqAuto()}
              changeLimit={changeLimit}
              className="filter"
              changeFilter={props.changeFilter}
              goToFirstPage={goToFirstPage}
            />
          </div>
        </Hidden>
      </div>
      <div className="filter__full">
        <AutoFilter
          filters={uniqAuto()}
          changeLimit={changeLimit}
          className="filter"
          changeFilter={props.changeFilter}
          goToFirstPage={goToFirstPage}
        />
      </div>
      <div className="cars">
        {props.filterCars.slice(state.offset, state.to).map((car, index) => (
          <AutoCard car={car} key={`item-${index}`} />
        ))}
      </div>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Pagination
          className="pagination"
          limit={state.limit}
          offset={state.offset}
          total={props.filterCars.length}
          onClick={(e, offset, page) => handleClick(offset, page)}
          centerRipple={true}
        />
      </MuiThemeProvider>
    </div>
  );
}

AutoList.propTypes = {
  cars: PropTypes.array.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filterCars: PropTypes.array.isRequired
};

export default AutoList;
