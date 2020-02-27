import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import amountLogo from "../../../assets/icons_amount.png";
import CurrencyModel from "../CurrencyModal";
import "./CurrencyPage.scss";

const CurrencyPage = props => {
  const { currencies, date } = props;
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
        className="from"
        autoWidth={true}
        value={state.fromValue}
        onChange={e => setState({ ...state, fromValue: e })}
        isSearchable
        options={currencies}
      />
      <div className="input__container">
        {state.fromValue && (
          <>
            <div className="value-input">
              <img src={amountLogo} alt="amount" />
              <TextField
                type="number"
                label="Amount Roubles"
                value={state.amount}
                onChange={({ target }) =>
                  setState({ ...state, amount: target.value })
                }
                margin="normal"
              />
            </div>
            <Typography gutterBottom variant="h6" component="h6">
              Цена за {state.amount} единиц:
              <br />
              {state.fromValue.name}
            </Typography>
            <div className="price-input">
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
            <div className="unit-input">
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
              {date}
            </Typography>
          </>
        )}
        <Button
          variant="outlined"
          color="primary"
          className="button-exchange"
          onClick={() => setState({ ...state, openModal: true })}
        >
          Exchange Rate
        </Button>
        <CurrencyModel
          handleClose={handleClose}
          open={state.openModal}
          currencies={currencies}
        />
      </div>
    </div>
  );
};

CurrencyPage.propTypes = {
  currencies: PropTypes.array.isRequired
};
export default CurrencyPage;
