import Head from "next/head";
import { Fragment, useEffect, FC} from "react";
import {
  gosaa_tm_moving_animation,
  aTagClick,
  dataImage,
  wowJsAnimation,
} from "../utils/utilits";
import Cursor from "./Cursor";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import Preloader from "./Preloader";

const Layout: FC<{}> = ({ children}) => {
  useEffect(() => {
    dataImage();
    wowJsAnimation();
    gosaa_tm_moving_animation();
    aTagClick();
  });
  return (
    <Fragment>
      <Head>
        <title>G.O.S.A NFT Collection </title>
      </Head>
      <Preloader />
      <div className="gosaa_tm_all_wrap" data-magic-cursor="show">
        <MobileMenu />
        <Header />
        {children}
        <Cursor />
      </div>
    </Fragment>
  );
};

export default Layout;
