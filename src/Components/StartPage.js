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

  const stylus = {
    main: {
      width: "100%",
      height: height - 64,
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
