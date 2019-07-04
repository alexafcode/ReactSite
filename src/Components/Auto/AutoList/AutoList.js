import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import AutoCard from "./AutoCard";
import AutoFilter from "./AutoFilter";
import "./AutoList.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import Fab from "@material-ui/core/Fab";

const theme = createMuiTheme();

function AutoList(props) {
  const [state, setState] = useState({
    offset: 0,
    limit: 4,
    visible: false
  });

  const handleClick = offset => {
    setState({ ...state, offset });
  };
  const goToFirstPage = () => {
    setState({ ...state, offset: 0 });
  };

  const changeLimit = lim => {
    setState({ ...state, limit: lim });
  };

  const toggleDrawer = () => {
    setState({ ...state, visible: !state.visible });
  };

  const uniqAuto = () => {
    if (props.cars) {
      let setAuto = new Set();
      props.cars.forEach(a => {
        setAuto.add(a.manufacturer);
      });
      let arrSet = Array.from(setAuto);
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
        {props.filterCars
          .slice(
            state.offset,
            state.offset === 0 ? state.limit : state.offset * 2
          )
          .map((car, index) => (
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
          onClick={(e, offset) => handleClick(offset)}
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
