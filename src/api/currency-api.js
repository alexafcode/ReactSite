export const fetchNews = async () => {
  const url = "https://www.cbr-xml-daily.ru/daily_json.js";
  return fetch(url)
    .then(response => response.json())
    .then(results => {
      return transfortNews(results);
    })
    .catch(e => console.error(e));
};

const transfortNews = response => {
  const time = response.Timestamp;
  const date = new Date(time).toLocaleString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const data = response.Valute;
  const valuteArr = Object.keys(data).map(key => {
    const e = data[key];
    return {
      name: e.Name,
      value: e.Value,
      nominal: e.Nominal
    };
  });
  valuteArr.map(c => {
    c.label = c.name;
    return c;
  });
  valuteArr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  return { valuteArr, date };
};
