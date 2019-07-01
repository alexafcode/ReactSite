import React from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
import { loadCars } from "../../store/auto/actions";
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
    const filteredAuto = () => {
      // goToFirstPage();
      // ToDo Easy
      let arr = [];
      let fa = this.state.filteredAuto;
      if (fa.length) {
        this.state.filteredAuto.forEach(r => {
          this.props.cars.forEach(el => {
            if (el.manufacturer === r) {
              arr.push(el);
            }
          });
        });
        return arr;
      } else {
        return this.props.cars;
      }
    };

    const changeFilter = filter => {
      let arr = filter;
      this.setState({ filteredAuto: arr });
    };

    return (
      <div>
        {!this.props.loading ? (
          <AutoList
            cars={this.props.cars}
            filterCars={filteredAuto()}
            changeFilter={changeFilter}
          />
        ) : (
          <div style={{ margin: "auto", width: "10%", marginTop: "10%" }}>
            <Loading />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cars: state.AutoReducers.cars,
    loading: state.AutoReducers.loading,
    ...state
  };
};

const mapDispatchToProps = {
  loadCars
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutoContainer);
