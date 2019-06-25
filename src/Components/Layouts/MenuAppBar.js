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

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  // menuButton: {
  //   marginLeft: -12,
  //   marginRight: 20
  // },
  link: {
    textDecoration: "none",
    marginRight: 1 + "rem",
    color: "white",
  },
  linkAuth: {
    left: "85%"
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
                    <Link to="/" className={classes.link}>
                      Home
                    </Link>
                    <Link to="/weather" className={classes.link}>
                      Weather
                    </Link>
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
              {/* <button onClick={() => console.log(this.props.AuthReducers)} /> */}
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state, props) => ({
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
