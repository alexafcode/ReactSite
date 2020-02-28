import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../src/history";
import { Provider } from "react-redux";
import StartPage from "./Components/StartPage";
import SignIn from "./Components/Login/SignIn";
import SignUp from "./Components/Login/SignUp";
import MenuAppBar from "./Components/Navigation/MenuAppBar";
import NotFound from "./Components/Layouts/NotFound";
import configureStore from "./store/configureStore";
import AutoItem from "./Components/Auto/AutoItem/AutoItem";
import PrivateRoute from "./Components/Layouts/PrivateRoute";
import CreateAuto from "./Components/Auto/Create/CreateAuto";
import "./App.scss";

const store = configureStore();
const Weather = lazy(() => import("./Components/Weather/WeatherContainer"));
const Currency = lazy(() => import("./Components/Currency/CurrencyContainer"));
const Auto = lazy(() => import("./Components/Auto/AutoList/AutoContainer"));
const News = lazy(() => import("./Components/News/NewsContainer"));
const PC = lazy(() => import("./Components/PersonalCabinet/PersonalCabinet"));

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      {/* ToDo fallback */}
      <MenuAppBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <PrivateRoute path="/weather" component={Weather} />
          <PrivateRoute path="/auto/add" component={CreateAuto} />
          <PrivateRoute path="/auto/:id" component={AutoItem} />
          <PrivateRoute path="/auto" component={Auto} />
          <PrivateRoute path="/news" component={News} />
          <Route path="/currency" component={Currency} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/pc" component={PC} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
);

export default App;
