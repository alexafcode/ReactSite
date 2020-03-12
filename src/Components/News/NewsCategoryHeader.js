import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../../store/news/actions";
import Fab from "@material-ui/core/Fab";
import { categoryMenu } from "./categoryConst";

const NewsCategoryHeader = props => {
  const stylus = {
    root: {
      display: "flex",
      flexDirection: "row",
      width: "60%",
      margin: "auto",
      marginBottom: "1rem",
      flexWrap: "wrap"
    },
    fab: {
      margin: "0.25rem auto 0.25rem"
    }
  };

  const makeStyle = index => {
    if (index === props.index) {
      return { color: "#ff3333", margin: "0.25rem auto 0.25rem" };
    } else {
      return { color: "#2a3fb3", margin: "0.25rem auto 0.25rem" };
    }
  };

  function changeCategory(category, index) {
    props.fetchData(category, index);
  }

  return (
    <div style={stylus.root}>
      {categoryMenu.map((el, index) => (
        <Fab
          style={makeStyle(index)}
          variant="extended"
          size="small"
          key={index}
          onClick={() => changeCategory(el.category, index)}
        >
          {el.text}
        </Fab>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    index: state.NewsReducers.index
  };
};

const mapDispatchToProps = {
  fetchData
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsCategoryHeader);
