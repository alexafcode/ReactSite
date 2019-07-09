import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import "./CurrencyPage.scss";
import amountLogo from "../../assets/icons_amount.png";

const CurrencyPage = props => {
  const [state, setState] = useState({
    fromValue: null,
    amount: 1
  });

  const result = () =>
    state.fromValue ? (state.fromValue.value * state.amount).toFixed(2) : "";

  return (
    <div className="form">
      <Select
        className="input__from"
        autoWidth={true}
        value={state.fromValue}
        onChange={e => setState({ ...state, fromValue: e })}
        isSearchable
        options={props.currencies}
      />
      <div className="input__container">
        <div className="input__value">
          <img src={amountLogo} alt="amount" />
          <TextField
            label="Amount"
            value={state.amount}
            onChange={e => setState({ ...state, amount: e.target.value })}
            margin="normal"
          />
        </div>
        {state.fromValue && (
          <>
            <div className="input__price">
              <img src={amountLogo} alt="amount" />
              <TextField
                disabled
                label="Price"
                value={result()}
                margin="normal"
              />
            </div>
            <div className="input__unit">
              <img src={amountLogo} alt="amount" />
              <TextField
                disabled
                label="Price on Unit"
                value={state.fromValue.value}
                className="input__unit"
                margin="normal"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CurrencyPage.propTypes = {
  currencies: PropTypes.array.isRequired
};
export default CurrencyPage;
