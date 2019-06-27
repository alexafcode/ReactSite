import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

export default function CheckboxLabels(props) {
  const initial = props.filters.map(filter => {
    return {
      checked: false,
      name: filter
    };
  });
  const [state, setState] = useState({
    initial,
    selectedFilters: []
  });

  const stylus = {
    formGroup: {
      position: "absolute",
    }
  };

  const handleChange = name => event => {
    if (event.target.checked) {
      let newFilters = state.selectedFilters;
      newFilters.push(name);
      setState({ ...state, selectedFilters: newFilters });
    } else {
      const newFilters = state.selectedFilters.filter(el => el !== name);
      setState({ ...state, selectedFilters: newFilters });
    }
  };

  const resetFilters = () => {
    // ToDo
    console.log(state.selectedFilters)
  }

  return (
    <FormGroup style={stylus.formGroup} className="filter">
      {props.filters &&
        props.filters.map((filter, index) => {
          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={state.checked}
                  onChange={handleChange(filter)}
                  value="checked"
                  color="primary"
                />
              }
              label={filter}
            />
          );
        })}
      <Button
        variant="contained"
        color="primary"
        onClick={() => resetFilters()}
      >
        Reset
      </Button>
    </FormGroup>
  );
}
