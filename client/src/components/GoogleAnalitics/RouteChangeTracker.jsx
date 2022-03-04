import React from "react";
import ReactGA from "react-ga";
import { Router, useNavigate } from "react-router-dom";
const RouteChangeTracker = () => {
  const navigate = useNavigate();
  navigate.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  });

  return <Router />;
};

export default RouteChangeTracker;
