import React from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
import { loadCars } from "../../store/auto/actions";
import AutoList from "./AutoList";

class AutoContainer extends React.Component {
  componentDidMount() {
    this.props.loadCars();
  }
  render() {
    // if (!this.props.isAuthenticated) {
    //   return <Redirect to="/signin" />;
    // }
    return <div><AutoList cars={this.props.cars} /></div>;
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    cars: state.AutoReducers.cars,
    isAuthenticated: state.AuthReducers.isAuthenticated,
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
