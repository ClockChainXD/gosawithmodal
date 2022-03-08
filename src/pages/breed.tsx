import type { NextPage } from "next";
import Head from "next/head";
import { BreedingView } from "../views";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional configuration
const options = {

  position: positions.BOTTOM_LEFT,
  timeout: 5000,
  offset: "10px",

  transition: transitions.SCALE,
};

const Breed: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>GOSA Breeding NFT!</title>
        <meta name="description" content="GOSA Breeding Page" />
      </Head>
      <style jsx global>{`
        body {
          background-image: url(/images/breed/breeding_bg3.jpg);
          background-repeat:no-repeat;
          background-position: center top;
          background-size: 100% auto;
        }
        .anchor_nav {
          display:none;
        }
      `}</style>
      <AlertProvider template={AlertTemplate} {...options}>
        <BreedingView />
      </AlertProvider>
    </div>
  );
};

export default Breed;
