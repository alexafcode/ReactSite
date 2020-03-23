import React from "react";

const withLocalStorage = WrappedComponent => {
  class HOC extends React.Component {
    getItem = key => {
      return JSON.parse(localStorage.getItem(key));
    };

    setItem = (key, data) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error(e);
      }
    };

    isItem = key => {
      if (localStorage.getItem(key)) {
        return true;
      } else {
        return false;
      }
    };

    removeItem = key => {
      if (this.isItem(key)) {
        localStorage.removeItem("authUser");
      }
    };

    render() {
      return (
        <WrappedComponent
          getItem={this.getItem}
          setItem={this.setItem}
          isItem={this.isItem}
          removeItem={this.removeItem}
          {...this.props}
        />
      );
    }
  }
  return HOC;
};

export default withLocalStorage;
