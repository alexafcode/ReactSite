import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import Home from "@material-ui/icons/Home";
import Cloud from "@material-ui/icons/Cloud";
import Euro from "@material-ui/icons/EuroSymbolOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Car from "@material-ui/icons/DirectionsCar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Dvr from "@material-ui/icons/Dvr";
import { Drawer } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

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

const links = [
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
  }
];
const linksNotAuth = [
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

class TemporaryDrawer extends React.Component {
  render(props) {
    const { classes, toggleDrawer, isOpen } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {this.props.isAuthenticated ? (
            <>
              {links.map((el, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <Link to={el.link} className={classes.link}>
                    <ListItemText primary={el.text} />
                  </Link>
                </ListItem>
              ))}
              <Button
                color="inherit"
                className={classes.linkAuth}
                onClick={() => this.props.singOutAction()}
              >
                SignOut
              </Button>
            </>
          ) : (
            <>
              {linksNotAuth.map((el, index) => (
                <ListItem button key={index}>
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <Link to={el.link} className={classes.link}>
                    <ListItemText primary={el.text} />
                  </Link>
                </ListItem>
              ))}
            </>
          )}
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
