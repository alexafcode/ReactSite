import keys from "../keys";

const _startUrl = "https://newsapi.org/v2/top-headlines?country=ru&category=";
const _key = keys.news;

export const getResource = async category => {
  const res = await fetch(`${_startUrl}${category}&apiKey=${_key}`, {
    mode: "cors"
  });
  if (!res.ok) {
    throw new Error(`Could not fetch, received ${res.status}`);
  }
  return await res.json();
};
