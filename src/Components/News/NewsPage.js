import React, { useState } from "react";
import PropTypes from "prop-types";
import NewsCardItem from "./NewsCardItem";

const NewsPage = props => {
  const stylus = {
    paddingTop: "1rem"
  };
  return (
    <div className="container" style={stylus}>
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
