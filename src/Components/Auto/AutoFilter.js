import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

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
      position: "absolute"
    }
  };
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const handleChangeLimit = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
    props.changeLimit(event.target.value);
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
    console.log(state.selectedFilters);
  };
  const classes = useStyles();
  const [values, setValues] = React.useState({
    limit: 4
  });

  return (
    <div>
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
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Выводить по:</InputLabel>
          <Select
            value={values.limit}
            onChange={handleChangeLimit}
            inputProps={{
              name: "limit"
            }}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
    </div>
  );
}
