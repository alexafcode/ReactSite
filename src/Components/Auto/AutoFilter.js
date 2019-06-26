import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

export default function CheckboxLabels(props) {
  const [state, setState] = React.useState({
    checked: false
  });
  const stylus = {
    formGroup: {
      position: "absolute",
      margiLeft: "1% !important"
    }
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup column style={stylus.formGroup}>
      {props.filters &&
        props.filters.map((filter, index) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checked}
                  onChange={handleChange("checked")}
                  value="checked"
                  color="primary"
                />
              }
              label={filter}
            />
          );
        })}
        <Button variant="contained" color="primary">Reset</Button>
    </FormGroup>
  );
}
