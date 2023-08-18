import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Themes from "../info/Themes";

const FrontLayout = () => {
  return (
    <Fragment>
      <Header />
      <Themes />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default FrontLayout;
