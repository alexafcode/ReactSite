import React, { useState, useEffect } from "react";
import CurrencyPage from "./CurrencyPage";
import Loading from "../Layouts/Loading";
import Message from "../Layouts/Message";

import { fetchNews } from "../../api/currency-api";

const CurrencyContainer = () => {
  const [state, setState] = useState({
    date: null,
    loading: null,
    error: false,
    errorMessage: null
  });

  const [currencies, setCurrencies] = useState([]);

  const stylus = {
    currency: {
      padding: "1rem"
    }
  };

  const fetch = () => {
    fetchNews()
      .then(({ valuteArr, date }) => {
        setCurrencies(valuteArr);
        setState({ ...state, loading: false, date });
      })
      .catch(e => {
        setState({
          ...state,
          error: true,
          errorMessage: e.message,
          loading: false
        }); // check
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="currency" style={stylus.currency}>
      {state.loading ? (
        <div style={{ margin: "auto", width: "10%", marginTop: "10%" }}>
          <Loading />
        </div>
      ) : (
        <CurrencyPage currencies={currencies} date={state.date} />
      )}
      {state.error && <Message type={"error"} text={state.errorMessage} />}
    </div>
  );
};
export default CurrencyContainer;
