import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { linksNotAuth, mobileLinks as links } from "./navLinks";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  }
};

class TemporaryDrawer extends React.Component {
  render() {
    const {
      classes,
      toggleDrawer,
      isOpen,
      singOutAction,
      isAuthenticated
    } = this.props;

    const authLinks = links.map((el, index) => (
      <ListItem button key={index}>
        <ListItemIcon>{el.icon}</ListItemIcon>
        <Link to={el.link} className={classes.link}>
          <ListItemText primary={el.text} />
        </Link>
      </ListItem>
    ));
    const buttonSignOut = (
      <Button
        color="inherit"
        className={classes.linkAuth}
        onClick={() => singOutAction()}
      >
        SignOut
      </Button>
    );

    const notAuthLinks = linksNotAuth.map((el, index) => (
      <ListItem button key={index}>
        <ListItemIcon>{el.icon}</ListItemIcon>
        <Link to={el.link} className={classes.link}>
          <ListItemText primary={el.text} />
        </Link>
      </ListItem>
    ));

    return (
      <div>
        <IconButton
          aria-label="Menu"
          className={classes.menuButton}
          color="inherit"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={isOpen} onClose={toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <div className={classes.list}>
              <List>
                {isAuthenticated ? (
                  <>
                    {authLinks}
                    {buttonSignOut}
                  </>
                ) : (
                  { notAuthLinks }
                )}
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func,
  isOpen: PropTypes.bool.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
