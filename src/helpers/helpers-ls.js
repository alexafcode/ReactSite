export const getItem = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};

export const removeItem = key => {
  if (isItem(key)) {
    localStorage.removeItem("authUser");
  }
};

export const isItem = key => {
  if (localStorage.getItem(key)) {
    return true;
  } else {
    return false;
  }
};
