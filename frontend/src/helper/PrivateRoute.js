import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <div>{isAuthenticated().data?.user?.role===0 ? children : <Navigate to="/" />}</div>
  );
};

export default PrivateRoute;