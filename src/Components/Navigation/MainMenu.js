import React from "react";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { links } from "./navLinks";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  link: {
    textDecoration: "none",
    marginRight: 1 + "rem",
    color: "white"
  },
  linkAuth: {
    marginLeft: "auto" // ToDo calc
  }
};

const MainMenu = props => {
  const { classes, singOutAction } = props;
  return (
    <>
      <Typography variant="h6">
        {links.map((route, index) => (
          <Link key={index} to={route.link} className={classes.link}>
            {route.name}
          </Link>
        ))}
      </Typography>
      <Button
        color="inherit"
        className={classes.linkAuth}
        onClick={() => singOutAction()}
      >
        SignOut
      </Button>
    </>
  );
};

export default compose(
  withStyles(styles, {
    name: "MainMenu"
  })
)(MainMenu);
