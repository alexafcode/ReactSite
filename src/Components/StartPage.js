import React from "react";

function StartPage() {
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const heightToolBar = (width <= 768) ? 56 : 64;


  const stylus = {
    main: {
      width: "100%",
      height: height - heightToolBar,
      backgroundImage: `url(https://picsum.photos/${width}/${height}?random)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
    },
  };
  return <div className="main" style={stylus.main} />;
}

export default StartPage;
