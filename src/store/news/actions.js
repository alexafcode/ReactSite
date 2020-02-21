import { getResource } from "../../api/news-api";

export const FETCH_DATA_NEWS = "FETCH_DATA_NEWS";
export const NEWS_LOADING = "NEWS_LOADING";
export const ERROR_FETCH_DATA = "ERROR_FETCH_DATA";

export const fetchData = (category = "", index = 0) => async dispatch => {
  dispatch({ type: NEWS_LOADING });
  getResource(category)
    .then(({ articles }) => {
      dispatch({ type: FETCH_DATA_NEWS, payload: articles, index });
    })
    .catch(e => dispatch({ type: ERROR_FETCH_DATA, payload: e.message }));
};
