import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import WeatherContainer from "./Components/Weather/WeatherContainer";
import StartPage from "./Components/StartPage";
import MenuAppBar from "./Components/Layouts/MenuAppBar";
import configureStore from "./store/configureStore";
import "./App.scss";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <MenuAppBar />
        <Route exact path="/" component={StartPage} />
        <Route path="/weather" component={WeatherContainer} />
    </Router>
  </Provider>
);

export default App;
