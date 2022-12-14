import React, { Fragment } from "react";
import NavBar from "./layout/NavBar";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../features/home/HomePage";

function App() {
  const location = useLocation();

  return (
    <Fragment>
      {location.pathname === "/" ? (
        <HomePage></HomePage>
      ) : (
        <Fragment>
          <NavBar></NavBar>
          <Container style={{ marginTop: "7em" }}>
            <Outlet></Outlet>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
}

export default observer(App);
