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
import Auto from "./Components/Auto/AutoList/AutoContainer";
import AutoItem from "./Components/Auto/AutoItem/AutoItem";
import PrivateRoute from "./Components/Layouts/PrivateRoute";
import Currency from "./Components/Currency/CurrencyContainer";
import CreateAuto from "./Components/Auto/Create/CreateAuto";
import "./App.scss";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <MenuAppBar />
      <Switch>
        <Route exact path="/" component={StartPage} />
        <PrivateRoute path="/weather" component={WeatherContainer} />
        <PrivateRoute path="/auto/add" component={CreateAuto} />
        <PrivateRoute path="/auto/:id" component={AutoItem} />
        <PrivateRoute path="/auto" component={Auto} />
        <Route path="/currency" component={Currency} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
