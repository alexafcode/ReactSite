import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
// import InboxIcon from "@material-ui/icons/Inbox";
import Home from "@material-ui/icons/Home"; // wb_cloudy
import Cloud from "@material-ui/icons/Cloud";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";

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
    const { classes, toggleDrawer, isOpen } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <Link to="/" className={classes.link}>
              <ListItemText primary="Home" />
            </Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Cloud />
            </ListItemIcon>
            <Link to="/weather" className={classes.link}>
              <ListItemText primary="Weather" />
            </Link>
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <IconButton
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
            {sideList}
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
