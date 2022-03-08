import type { NextPage } from "next";
import Head from "next/head";
import { CandyMachineMintView } from "../views";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional configuration
const options = {

  position: positions.BOTTOM_LEFT,
  timeout: 5000,
  offset: "10px",

  transition: transitions.SCALE,
};

const Mint: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>GOSA Mint NFT!</title>
        <meta name="description" content="GOSA Minting Page" />
      </Head>
      <style jsx global>{`
        body {
          background-image: url(/images/mint/mint_bg2.jpg);
          background-repeat:no-repeat;
          background-position: center top;
          background-size: 100% auto;
        }
        .anchor_nav {
          display:none;
        }
      `}</style>
      <AlertProvider template={AlertTemplate} {...options}>
        <CandyMachineMintView />
      </AlertProvider>
    </div>
  );
};

export default Mint;
