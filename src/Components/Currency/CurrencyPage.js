import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import amountLogo from "../../assets/icons_amount.png";
import "./CurrencyPage.scss";

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
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                style={{ lineHeight: 2.5 }}
              >
                {result()} рублей
              </Typography>
            </div>
            <div className="input__unit">
              <img src={amountLogo} alt="amount" />
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                style={{ lineHeight: 2.5 }}
              >
                {state.fromValue.value} рублей
              </Typography>
            </div>
            <Typography gutterBottom variant="h5" component="h5">
              Данные на дату: {props.date}
            </Typography>
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
