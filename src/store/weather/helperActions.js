export const isSaveCity = () => {
  if (localStorage.getItem("city")) {
    return true;
  } else {
    return false;
  }
};

export const getCityFromLS = () => {
  try {
    return JSON.parse(localStorage.getItem("city"));
  } catch (e) {
    return console.error(e);
  }
};

export const saveToLS = data => {
  let arr = [];
  let exist = false;
  let city = {};
  if (localStorage.getItem("city") != null) {
    try {
      arr = JSON.parse(localStorage.getItem("city"));
    } catch (e) {
      return console.error(e);
    }
    if (arr.some(e => e.Key === data.key)) {
      exist = true;
    }
  }
  if (!exist) {
    city = {
      Key: data.key,
      city: data.city,
      country: data.country,
      fromLS: true
    };
    arr.push(city);
    localStorage.setItem("city", JSON.stringify(arr));
  }
};

export const deleteToLS = data => {
  let arr = [];
  if (localStorage.getItem("city") != null) {
    try {
      arr = JSON.parse(localStorage.getItem("city"));
    } catch (e) {
      return console.error(e);
    }
    const filteredArr = arr.filter(el => el.Key != data.key);
    localStorage.setItem("city", JSON.stringify(filteredArr));
  }
};
