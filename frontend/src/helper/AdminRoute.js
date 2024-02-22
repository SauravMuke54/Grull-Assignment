import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ children, ...rest }) => {
  return (
    <div>{isAuthenticated().data?.community_manager?.role===1 ? children : <Navigate to="/" />}</div>
  );
};

export default AdminRoute;