import React, { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
