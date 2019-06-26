import React from "react";
import { connect } from "react-redux";
import {  Route, Redirect } from "react-router-dom";

function PrivateRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => rest.isAuthenticated === true
        ? <Component />
        : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
    />
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.AuthReducers.isAuthenticated,
    ...state
  };
};


export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
