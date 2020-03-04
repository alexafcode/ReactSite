import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import history from "../../../history";

function CheckboxLabels(props) {
  const initial = props.filters.map(filter => {
    return {
      name: filter,
      checked: false
    };
  });

  const [state, setState] = useState({
    initial,
    selectedFilters: []
  });

  const [values, setValues] = React.useState({
    limit: 4
  });

  const handleChangeLimit = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
    props.changeLimit(event.target.value);
  };

  const handleChange = name => event => {
    let init = state.initial;
    init.map(el =>
      el.name === name ? (el.checked = event.target.checked) : el
    );
    if (event.target.checked) {
      let newFilters = state.selectedFilters;
      newFilters.push(name);
      setState({ ...state, selectedFilters: newFilters });
      props.changeFilter(newFilters);
    } else {
      const newFilters = state.selectedFilters.filter(el => el !== name);
      setState({ ...state, selectedFilters: newFilters });
      props.changeFilter(newFilters);
    }
    props.goToFirstPage();
  };

  const resetFilters = () => {
    let initial = state.initial;
    initial.map(el => (el.checked = false));
    setState({ initial, selectedFilters: [] });
    props.changeFilter([]);
    props.goToFirstPage();
  };

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
  const classes = useStyles();

  return (
    <div>
      <FormGroup style={stylus.formGroup} className="filter">
        {props.filters &&
          state.initial.map((filter, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={filter.checked}
                    onChange={handleChange(filter.name)}
                    value={filter.checked}
                    color="primary"
                    name={filter.name}
                  />
                }
                label={filter.name}
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
        <div className="autolist__add" style={{ margin: "auto" }}>
          <Fab
            color="primary"
            aria-label="Add"
            onClick={() => history.push(`/auto/add`)}
          >
            <AddIcon />
          </Fab>
        </div>
      </FormGroup>
    </div>
  );
}

CheckboxLabels.propTypes = {
  filters: PropTypes.array.isRequired,
  changeFilter: PropTypes.func.isRequired,
  goToFirstPage: PropTypes.func.isRequired
};

export default CheckboxLabels;
