import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NewsCardItem from "./NewsCardItem";
import NewsCategoryMenu from "./NewsCategory";
import Fab from "@material-ui/core/Fab";
import ArrowUp from "@material-ui/icons/KeyboardArrowUp";

const NewsPage = props => {
  const stylus = {
    container: {
      paddingTop: "1rem"
    },
    menu: {
      position: "fixed",
      padding: "0.5rem",
      zIndex: 1
    },
    button: {
      marginTop: "20%",
      position: "fixed",
      zIndex: 1
    }
  };
  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const [onTopButton, setOnTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 350) {
        if (!onTopButton) {
          setOnTopButton(true);
        }
      } else if (onTopButton) {
        setOnTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onTopButton]);

  return (
    <div className="container" style={stylus.container}>
      <div className="menu" style={stylus.menu}>
        <NewsCategoryMenu />
      </div>
      <div className="up" style={stylus.button}>
        {onTopButton && (
          <Fab color="primary" aria-label="Up" onClick={() => onTop()}>
            <ArrowUp />
          </Fab>
        )}
      </div>
      {props.news.map((el, index) => (
        <NewsCardItem news={el} key={index} />
      ))}
    </div>
  );
};

NewsPage.propTypes = {
  news: PropTypes.array.isRequired
};
export default NewsPage;
