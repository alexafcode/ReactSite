import { useState, useEffect } from "react";

function getWindowSize() {
  const { innerWidth: width, innerHeight: height, navigator } = window;
  const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
  const isMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  return {
    width,
    height,
    isMobile,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowSize());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
