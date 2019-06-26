import React from "react";
import AutoCard from "./AutoCard";
import AutoFilter from "./AutoFilter";

function AutoList(props) {
  const stylus = {
    card: {
      marginTop: "2%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto" // "1fr 1fr 1fr",
      // gridTemplateAreas: '". ." ". ." ". ."'
    }
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
    <div>
      {props.cars && <AutoFilter filters={uniqAuto()} />}
      <div className="cars" style={stylus.card}>
        {props.cars &&
          props.cars.map((car, index) => <AutoCard car={car}  key={`item-${index}`} />)}
      </div>
    </div>
  );
}
export default AutoList;
