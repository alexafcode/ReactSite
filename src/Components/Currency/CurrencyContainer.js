import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyContainer = () => {
  const [state, setState] = useState({
    currencies: [],
    loading: null
  });
  const fetchData = async () => {
    setState({ ...state, loading: true });
    let url = "https://www.cbr-xml-daily.ru/daily_json.js";
    await axios
      .get(url)
      .then(response => {
        const data = response.data.Valute;
        const arr = Object.keys(data).map(key => {
          let e = data[key];
          return {
            name: e.Name,
            value: e.Value,
            nominal: e.Nominal
          };
        });
        arr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        setState({ ...state, currencies: arr, loading: false });
      })
      .catch();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div />;
};
export default CurrencyContainer;
