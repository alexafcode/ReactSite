import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../src/history";
import { Provider } from "react-redux";
import WeatherContainer from "./Components/Weather/WeatherContainer";
import StartPage from "./Components/StartPage";
import SignIn from "./Components/Login/SignIn";
import SignUp from "./Components/Login/SignUp";
import MenuAppBar from "./Components/Layouts/MenuAppBar";
import NotFound from "./Components/Layouts/NotFound";
import configureStore from "./store/configureStore";
import "./App.scss";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <MenuAppBar />
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route path="/weather" component={WeatherContainer} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
