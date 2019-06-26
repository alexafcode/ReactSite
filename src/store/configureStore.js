import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { verifyAuth } from "./register/actions";

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    // compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
    initialState
  );
  store.dispatch(verifyAuth())
  return store;
}


