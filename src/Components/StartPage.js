import React from "react";
function StartPage() {
  const stylus = {
    main: {
      width: "100%",
      height: "93vh",
      backgroundImage: "url(https://picsum.photos/1000/600?random)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      overflow: "hidden"
    }
  };
  return <div className="main" style={stylus.main} />;
}

export default StartPage;
