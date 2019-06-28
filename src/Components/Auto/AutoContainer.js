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
  render() {
    return (
      <div>
        {!this.props.loading ? (
          <AutoList cars={this.props.cars} />
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
