import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
// import StartPage from "./Components/StartPage";
// import WeatherPage from "./Components/Weather/WeatherPage";
import WeatherContainer from "./Components/Weather/WeatherContainer";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import * as serviceWorker from "./serviceWorker";
import MenuAppBar from "./Components/Layouts/MenuAppBar";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <MenuAppBar />
      <Route path="/" component={App} />
      <Route path="/weather" component={WeatherContainer} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
