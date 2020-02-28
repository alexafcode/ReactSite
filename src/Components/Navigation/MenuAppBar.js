import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { singOutAction } from "../../store/register/actions";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { AppBar, Toolbar } from "@material-ui/core";
import TemporaryDrawer from "./TemporaryDrawer";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";

import MainMenu from "./MainMenu";

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

class MenuAppBar extends React.Component {
  state = {
    drawerOpen: false
  };

  handleMenu = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { classes, singOutAction, isAuthenticated } = this.props;
    const { drawerOpen } = this.state;
    const notAuthMenu = (
      <Typography variant="h6">
        <Link to="/signin" className={classes.link}>
          SignIn
        </Link>
        <Link to="/signup" className={classes.link}>
          SignUp
        </Link>
      </Typography>
    );

    const menu = isAuthenticated ? (
      <MainMenu singOutAction={singOutAction} />
    ) : (
      notAuthMenu
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Hidden only={["md", "xl", "lg"]}>
              <TemporaryDrawer
                isAuthenticated={isAuthenticated}
                singOutAction={singOutAction}
                onClick={this.handleMenu}
                isOpen={drawerOpen}
                toggleDrawer={this.handleMenu}
              />
            </Hidden>
            <Hidden only={["xs", "sm"]}>{menu}</Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  singOutAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  ...state,
  isAuthenticated: state.AuthReducers.isAuthenticated
});

const mapDispatchToProps = {
  singOutAction
};

export default compose(
  withStyles(styles, {
    name: "MenuAppBar"
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(MenuAppBar);
