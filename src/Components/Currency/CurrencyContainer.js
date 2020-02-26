import React, { useState, useEffect } from "react";
import CurrencyPage from "./CurrencyPage";
import Loading from "../Layouts/Loading";
import Message from "../Layouts/Message";

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

  const fetchData = async () => {
    setState({ ...state, loading: true });
    const url = "https://www.cbr-xml-daily.ru/daily_json.js";
    fetch(url)
      .then(result => result.json())
      .then(response => {
        const time = response.Timestamp;
        const date = new Date(time).toLocaleString("ru", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
        const data = response.Valute;
        const arr = Object.keys(data).map(key => {
          const e = data[key];
          return {
            name: e.Name,
            value: e.Value,
            nominal: e.Nominal
          };
        });
        arr.map(c => {
          c.label = c.name;
          return c;
        });
        arr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        setCurrencies(arr);
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
