import React from "react";
import useDeviceDetect from "../hooks/useMobileDetect";

function StartPage() {
  const { isMobile } = useDeviceDetect();
  const { innerWidth: width, innerHeight: height } = window;

  const heightToolBar = isMobile ? 56 : 64;

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
