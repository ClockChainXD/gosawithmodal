import Link from "next/link";
import { FC , useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as anchor from "@project-serum/anchor";

import { SolanaLogo } from "components";
import { MintSection } from "./MintSection";
import { config } from "./config";
import Layout from "../../../src/layouts/Layout";

const treasury = new anchor.web3.PublicKey(config.TREASURY_ADDRESS!);



const candyMachineId = new anchor.web3.PublicKey(config.CANDY_MACHINE_ID!);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

export const CandyMachineMintView: FC = ({}) => {

  

  return (
    <Layout>
      <a href="/" className="hidememobile" style={{position: 'absolute', width: '300px', height: '300px', left: '44%', cursor: 'pointer'}}></a>
      <div className="container marginTop370">
        <div className="row hidememobile">
        <div className="col-1"></div>
          <div className="col-3 text-right">
          </div>
          <div className="col-4 text-center">
            <div className="mint_count">
              <MintSection
                candyMachineId={candyMachineId}
                startDate={startDateSeed}
                txTimeout={txTimeout} count={0}              />
            </div>
          </div>
          <div className="col-3 text-left">
          </div>
          <div className="col-12 text-center">
          </div>
          <div className="col-1"></div>
        </div>
        <div className="row showmemobile">
        <div className="col-12 text_center greybox">
          You can <strong>MINT</strong> at bigger than 1024x768 resolution!!!
        </div>
        </div>
    </div>
    </Layout>
  );
};
