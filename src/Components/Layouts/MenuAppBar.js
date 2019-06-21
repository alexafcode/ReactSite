import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { AppBar, Toolbar } from "@material-ui/core";
import TemporaryDrawer from "./TemporaryDrawer";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    textDecoration: "none",
    marginRight: 1 + "rem",
    color: "white"
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
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
        <AppBar
          position="static"
          //onClick={this.handleMenu}
        >
          <Toolbar>
            <Hidden only={['md','xl','lg']}>
              <TemporaryDrawer
                onClick={this.handleMenu}
                isOpen={drawerOpen}
                toggleDrawer={this.handleMenu}
              />
            </Hidden>
            <Hidden only={['xs','sm']}>
            <Typography variant="h6">
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <Link to="/weather" className={classes.link}>
                Weather
              </Link>
            </Typography>
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

export default withStyles(styles)(MenuAppBar);
