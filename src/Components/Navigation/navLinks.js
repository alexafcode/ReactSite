import React from "react";
import Home from "@material-ui/icons/Home";
import Cloud from "@material-ui/icons/Cloud";
import Euro from "@material-ui/icons/EuroSymbolOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Car from "@material-ui/icons/DirectionsCar";
import Dvr from "@material-ui/icons/Dvr";

export const links = [
  {
    link: "/",
    name: "Home"
  },
  {
    link: "/weather",
    name: "Weather"
  },
  {
    link: "/auto",
    name: "Cars"
  },
  {
    link: "/currency",
    name: "Currency"
  },
  {
    link: "/news",
    name: "News"
  },
  {
    link: "/pc",
    name: "PC"
  }
];

export const mobileLinks = [
  {
    icon: <Home />,
    link: "/",
    text: "Home"
  },
  {
    icon: <Cloud />,
    link: "/weather",
    text: "Weather"
  },
  {
    icon: <Car />,
    link: "/auto",
    text: "Cars"
  },
  {
    icon: <Dvr />,
    link: "/news",
    text: "News"
  },
  {
    icon: <Euro />,
    link: "/currency",
    text: "Currency"
  },
  {
    icon: <AccountCircle />,
    link: "/pc",
    text: "PC"
  }
];
export const linksNotAuth = [
  {
    icon: <AccountCircle />,
    link: "/signin",
    text: "SignIn"
  },
  {
    icon: <AccountCircle />,
    link: "/signup",
    text: "SignUp"
  }
];
