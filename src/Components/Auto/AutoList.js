import React, { useState } from "react";
import AutoCard from "./AutoCard";
import AutoFilter from "./AutoFilter";
import "./AutoList.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createMuiTheme();

function AutoList(props) {
  const [state, setState] = useState({
    offset: 0,
    limit: 4
  });

  const handleClick = offset => {
    setState({ ...state, offset });
  };

  const changeLimit = lim => {
    setState({ ...state, limit: lim });
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

  return (
    <div className="autolist">
      <AutoFilter
        filters={uniqAuto()}
        changeLimit={changeLimit}
        className="filter"
        changeFilter={props.changeFilter}
      />
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
export default AutoList;
