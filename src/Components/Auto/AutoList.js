import React from "react";
import AutoCard from "./AutoCard";
import AutoFilter from "./AutoFilter";
import "./AutoList.scss";

function AutoList(props) {

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
      {props.cars && <AutoFilter filters={uniqAuto()} className="filter" />}
      <div className="cars">
        {props.cars &&
          props.cars.map((car, index) => (
            <AutoCard car={car}  key={`item-${index}`} />
          ))}
          </div>
    </div>
  );
}
export default AutoList;
