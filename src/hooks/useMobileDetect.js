import React, { useState, useEffect } from "react";

function getWindowSize() {
  const { innerWidth: width } = window;
  return width <= 768;
}

export default function useMobileDetect() {
  const [isMobile, setMobile] = useState(getWindowSize());

  useEffect(() => {
    function handleResize() {
      setMobile(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
}
