import React from "react";

const withLocalStorage = WrappedComponent => {
  class HOC extends React.Component {
    _lsKey = "city";

    isSaveCity = () => {
      if (localStorage.getItem(this._lsKey)) {
        return true;
      } else {
        return false;
      }
    };

    getCityFromLS = () => {
      try {
        return JSON.parse(localStorage.getItem(this._lsKey));
      } catch (e) {
        return console.error(e);
      }
    };

    saveToLS = data => {
      let exist = false;
      const arr = this.getCityFromLS() || [];
      const city = {
        Key: data.key,
        city: data.city,
        country: data.country,
        fromLS: true
      };
      if (arr) {
        if (arr.some(e => e.Key === data.key)) {
          exist = true;
        }
        if (!exist) {
          arr.push(city);
          this.saveCitysToLS(arr);
        }
      } else {
        arr.push(city);
        this.saveCitysToLS(arr);
      }
    };
    saveCitysToLS = data => {
      try {
        localStorage.setItem(this._lsKey, JSON.stringify(data));
      } catch (e) {
        console.error(e);
      }
    };
    removeLS = () => {
      localStorage.removeItem(this._lsKey);
    };

    deleteToLS = data => {
      const arr = this.getCityFromLS();
      if (arr) {
        const filteredArr = arr.filter(el => el.Key != data.key);
        if (filteredArr.length) {
          this.saveCitysToLS(filteredArr);
        } else {
          this.removeLS();
        }
      }
    };

    render() {
      return (
        <WrappedComponent
          isSaveCity={this.isSaveCity}
          getCityFromLS={this.getCityFromLS}
          saveToLS={this.saveToLS}
          removeLS={this.removeLS}
          deleteToLS={this.deleteToLS}
          {...this.props}
        />
      );
    }
  }
  return HOC;
};

export default withLocalStorage;
