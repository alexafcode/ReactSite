import React, { useState } from "react";
import PropTypes from "prop-types";
import NewsCardItem from "./NewsCardItem";
import NewsCategoryMenu from "./NewsCategory";

const NewsPage = props => {
  const stylus = {
    container: {
      paddingTop: "1rem"
    },
    menu: {
      position: "absolute",
      padding: "0.5rem",
      zIndex: 1
    }
  };
  return (
    <div className="container" style={stylus.container}>
      <div className="menu" style={stylus.menu}>
        <NewsCategoryMenu />
      </div>
      {props.news.map((el, index) => (
        <NewsCardItem news={el} key={index} />
      ))}
    </div>
  );
};

// ToDo
NewsPage.propTypes = {
  news: PropTypes.array.isRequired
  // func.isRequired
};
export default NewsPage;
