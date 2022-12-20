import React, { Fragment, useEffect } from "react";
import NavBar from "./layout/NavBar";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import { useStore } from "./stores/store";
import LoadingComponent from "./layout/LoadingComponent";
import ModalContainer from "./common/modals/ModalContainer";

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect( () => {
    if(commonStore.token){
      userStore.getUser().finally( () => { commonStore.setApploaded()});
    } else {
      commonStore.setApploaded();
    }
  }, [commonStore, userStore]);

  if(!commonStore.appLoaded) return <LoadingComponent content="Loading App...."></LoadingComponent>

  return (
    <Fragment>
      <ModalContainer></ModalContainer>
      <ToastContainer position='bottom-right' theme="colored" hideProgressBar />
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
