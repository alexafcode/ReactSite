import axios from "axios";
export const FETCH_DATA = "FETCH_DATA";
export const NEWS_LOADING = "NEWS_LOADING";
export const ERROR_FETCH_DATA = "ERROR_FETCH_DATA";
export const ERROR_MESSAGE = "ERROR_MESSAGE";

const key = "";
const startUrl = "https://newsapi.org/v2/top-headlines?country=ru&category=";

export const fetchData = (category = "") => async dispatch => {
  dispatch({ type: ERROR_FETCH_DATA, payload: false });
  dispatch({ type: NEWS_LOADING, payload: true });
  const url = `${startUrl}${category}&apiKey=${key}`;
  axios
    .get(url)
    .then(response => {
      dispatch({ type: FETCH_DATA, payload: response.data.articles });
      dispatch({ type: NEWS_LOADING, payload: false });
    })
    .catch(e => {
      dispatch({ type: ERROR_FETCH_DATA, payload: true });
      dispatch({ type: ERROR_MESSAGE, payload: e.message });
      dispatch({ type: NEWS_LOADING, payload: false });
    });
};
