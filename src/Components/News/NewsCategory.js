import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../store/news/actions";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { categoryMenu } from "./categoryConst";

const StyledMenu = withStyles({
  main: {
    position: "absolute",
    padding: "1rem",
    zIndex: 1
  },
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    },
    active: {
      fontSize: "1.5rem"
    }
  }
}))(MenuItem);

function NewsCategoryMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function changeCategory(category, index) {
    props.fetchData(category, index);
    handleClose();
  }
  const activeStyle = { color: "#ff3333" };

  return (
    <div>
      <Button
        size="small"
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {categoryMenu.map((el, index) => (
          <StyledMenuItem
            style={index === props.index ? activeStyle : {}}
            key={index}
            onClick={() => changeCategory(el.category, index)}
          >
            <ListItemIcon>{el.icon}</ListItemIcon>
            <ListItemText primary={el.text} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    index: state.NewsReducers.index
  };
};

const mapDispatchToProps = {
  fetchData
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsCategoryMenu);
