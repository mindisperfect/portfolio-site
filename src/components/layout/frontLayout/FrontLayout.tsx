import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Themes from "../info/Themes";

const FrontLayout = () => {
  return (
    <Fragment>
      <Header />
      <Themes />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default FrontLayout;
