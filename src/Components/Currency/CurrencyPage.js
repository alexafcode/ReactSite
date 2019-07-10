import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import amountLogo from "../../assets/icons_amount.png";
import CurrencyModel from "./CurrencyModal";
import "./CurrencyPage.scss";

const CurrencyPage = props => {
  const [state, setState] = useState({
    fromValue: null,
    amount: 1,
    openModal: false
  });

  const result = () =>
    state.fromValue
      ? (
          (state.fromValue.value / state.fromValue.nominal) *
          state.amount
        ).toFixed(2)
      : "";

  const unitPrice = () =>
    state.fromValue ? state.fromValue.value / state.fromValue.nominal : "";

  const handleClose = () => {
    setState({ ...state, openModal: false });
  };

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
        {state.fromValue && (
          <>
            <div className="input__value">
              <img src={amountLogo} alt="amount" />
              <TextField
                label="Amount Roubles"
                value={state.amount}
                onChange={e => setState({ ...state, amount: e.target.value })}
                margin="normal"
              />
            </div>
            <Typography gutterBottom variant="h6" component="h6">
              Цена за {state.amount} единиц:
              <br />
              {state.fromValue.name}
            </Typography>
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
            <Typography gutterBottom variant="h6" component="h6">
              Цена за единицу:
            </Typography>
            <div className="input__unit">
              <img src={amountLogo} alt="amount" />
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                style={{ lineHeight: 2.5 }}
              >
                {unitPrice()}
              </Typography>
            </div>
            <Typography gutterBottom variant="h6" component="h6">
              Данные на Дату:
            </Typography>
            <Typography gutterBottom variant="h5" component="h5">
              {props.date}
            </Typography>
          </>
        )}
        <Button
          variant="outlined"
          color="primary"
          className="form__button"
          onClick={() => setState({ ...state, openModal: true })}
        >
          Exchange Rate
        </Button>
        <CurrencyModel
          handleClose={handleClose}
          open={state.openModal}
          currencies={props.currencies}
        />
      </div>
    </div>
  );
};

CurrencyPage.propTypes = {
  currencies: PropTypes.array.isRequired
};
export default CurrencyPage;
