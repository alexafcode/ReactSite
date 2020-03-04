import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCars } from "../../store/auto/actions";
import TextField from "@material-ui/core/TextField";
import AutoList from "./AutoList";
import Loading from "../Layouts/Loading";

class AutoContainer extends React.Component {
  componentDidMount() {
    this.props.loadCars();
  }
  state = {
    filteredAuto: []
  };
  render() {
    const { cars, loading, error, errorMessage } = this.props;
    const filteredAuto = () => {
      // ToDo Easy
      const arr = [];
      const fa = [...this.state.filteredAuto];
      if (fa.length) {
        fa.forEach(r => {
          cars.forEach(el => {
            if (el.manufacturer === r) {
              arr.push(el);
            }
          });
        });
        return arr;
      } else {
        return cars;
      }
    };

    const changeFilter = filter => {
      this.setState({ filteredAuto: filter });
    };

    const load = loading ? (
      <div style={{ margin: "auto", width: "10%", marginTop: "10%" }}>
        <Loading />
      </div>
    ) : (
      <AutoList
        cars={cars}
        filterCars={filteredAuto()}
        changeFilter={changeFilter}
      />
    );
    const errorText = error ? (
      <TextField
        error
        id="standard-error"
        label="Error"
        value={errorMessage}
        margin="normal"
        InputProps={{
          readOnly: true
        }}
      />
    ) : null;

    return (
      <div>
        {errorText}
        {load}
      </div>
    );
  }
}

AutoContainer.propTypes = {
  cars: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadCars: PropTypes.func.isRequired
};

const mapStateToProps = ({ AutoReducers }) => {
  return {
    cars: AutoReducers.cars,
    loading: AutoReducers.loading
  };
};

const mapDispatchToProps = {
  loadCars
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoContainer);
