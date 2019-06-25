import React from "react";
import { connect } from "react-redux";
import { loadCars } from "../../store/auto/actions";

class AutoContainer extends React.Component {
  componentDidMount() {
    this.props.loadCars();
  }
  render() {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    cars: state.AutoReducers.cars,
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
