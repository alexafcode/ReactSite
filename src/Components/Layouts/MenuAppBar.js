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
import Button from "@material-ui/core/Button";
import { prototype } from "stream";

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
    left: "80%" // ToDo calc
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
    const { classes } = this.props;
    const { drawerOpen } = this.state;
    const links = [
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
      }
    ];

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Hidden only={["md", "xl", "lg"]}>
              <TemporaryDrawer
                isAuthenticated={this.props.isAuthenticated}
                singOutAction={this.props.singOutAction}
                onClick={this.handleMenu}
                isOpen={drawerOpen}
                toggleDrawer={this.handleMenu}
              />
            </Hidden>
            <Hidden only={["xs", "sm"]}>
              {this.props.isAuthenticated ? (
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
                    onClick={() => this.props.singOutAction()}
                  >
                    SignOut
                  </Button>
                </>
              ) : (
                <Typography variant="h6">
                  <Link to="/signin" className={classes.link}>
                    SignIn
                  </Link>
                  <Link to="/signup" className={classes.link}>
                    SignUp
                  </Link>
                </Typography>
              )}
            </Hidden>
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MenuAppBar);
