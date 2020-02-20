const _lsKey = "city";

export const isSaveCity = () => {
  if (localStorage.getItem(_lsKey)) {
    return true;
  } else {
    return false;
  }
};

export const getCityFromLS = () => {
  try {
    return JSON.parse(localStorage.getItem(_lsKey));
  } catch (e) {
    return console.error(e);
  }
};

export const saveToLS = data => {
  let exist = false;
  const arr = getCityFromLS() || [];
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
      saveCitysToLS(arr);
    }
  } else {
    arr.push(city);
    saveCitysToLS(arr);
  }
};
const saveCitysToLS = data => {
  try {
    localStorage.setItem(_lsKey, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};
const removeLS = () => {
  localStorage.removeItem(_lsKey);
};

export const deleteToLS = data => {
  const arr = getCityFromLS();
  if (arr) {
    const filteredArr = arr.filter(el => el.Key != data.key);
    if (filteredArr.length) {
      saveCitysToLS(filteredArr);
    } else {
      removeLS();
    }
  }
};
