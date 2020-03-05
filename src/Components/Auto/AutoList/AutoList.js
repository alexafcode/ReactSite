import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import AutoCard from "../AutoCard";
import AutoFilter from "../AutoFilter/AutoFilter";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import Fab from "@material-ui/core/Fab";
import Hidden from "@material-ui/core/Hidden";
import "./AutoList.scss";

const theme = createMuiTheme();

function AutoList(props) {
  const { cars, changeFilter, filterCars } = props;
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
    if (cars) {
      const setAuto = [...new Set(cars.map(a => a.manufacturer))];
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
  const mobileFilter = (
    <div className="filter__mobile">
      <Fab color="primary" aria-label="Add" size="small" onClick={toggleDrawer}>
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
            changeFilter={changeFilter}
            goToFirstPage={goToFirstPage}
          />
        </div>
      </Hidden>
    </div>
  );
  const fullFilter = (
    <div className="filter__full">
      <AutoFilter
        filters={uniqAuto()}
        changeLimit={changeLimit}
        className="filter"
        changeFilter={changeFilter}
        goToFirstPage={goToFirstPage}
      />
    </div>
  );

  const pagination = (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Pagination
        className="pagination"
        limit={state.limit}
        offset={state.offset}
        total={filterCars.length}
        onClick={(e, offset, page) => handleClick(offset, page)}
        centerRipple={true}
      />
    </MuiThemeProvider>
  );

  return (
    <div className="autolist">
      {mobileFilter}
      {fullFilter}
      <div className="cars">
        {filterCars.slice(state.offset, state.to).map((car, index) => (
          <AutoCard car={car} key={`item-${index}`} />
        ))}
      </div>
      {pagination}
    </div>
  );
}

AutoList.propTypes = {
  cars: PropTypes.array.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filterCars: PropTypes.array.isRequired
};

export default AutoList;
