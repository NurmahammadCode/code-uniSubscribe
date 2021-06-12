import React, { FunctionComponent } from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";

export const PrivateRoute: FunctionComponent<any> = ({
  component: Component,
  ...rest
}) => {
  const history = useHistory();

  const accessToken = localStorage.getItem("isAuth");

  if (accessToken != "true") {
    history.push("/login");
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        // logic for authenticated user to access /app part goes here.
        // e.g. check if user is logged-in logic.
        const isLoggedIn = true;

        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login"} />
        );
      }}
    />
  );
};
