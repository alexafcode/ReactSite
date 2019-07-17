import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./PersonalCabinet.scss";

const PersonalCabinet = props => {
  const [state, setState] = useState({
    disabled: true,
    displayName: props.user.displayName ? props.user.displayName : ""
  });

  const stylus = {
    media: {
      backgroundImage: `url(${props.user.photoURL})`
    }
  };

  return (
    <div className="cabinet">
      <div className="cabinet__media" style={stylus.media} />
      <div className="cabinet__text">
        {props.user.displayName && (
          <TextField
            disabled={state.disabled}
            label="Display Name"
            margin="normal"
            value={state.displayName}
            onChange={e => setState({ ...state, displayName: e.target.value })}
          />
        )}
        <TextField
          disabled
          label="Display Name"
          margin="normal"
          value={props.user.email}
        />
        <div className="button__container">
          {state.disabled && (
            <Button
              variant="contained"
              color="primary"
              className="button__change"
              onClick={() => setState({ ...state, disabled: !state.disabled })}
            >
              Изменить
            </Button>
          )}
          {!state.disabled && (
            <div className="button__submit">
              <Button
                variant="contained"
                color="primary"
                className="button__save"
                onClick={() => console.log("")}
              >
                Сохранить
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="button__cancel"
                onClick={() =>
                  setState({ ...state, disabled: !state.disabled })
                }
              >
                Отмена
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PersonalCabinet.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.AuthReducers.user
    // loading: state.AuthReducers.loading,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalCabinet);
