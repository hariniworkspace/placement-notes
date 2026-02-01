import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const TopLoader = () => {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    ref.current.continuousStart();

    const timer = setTimeout(() => {
      ref.current.complete();
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <LoadingBar
      color="#8b5cf6"
      height={3}
      shadow={true}
      ref={ref}
    />
  );
};

export default TopLoader;
