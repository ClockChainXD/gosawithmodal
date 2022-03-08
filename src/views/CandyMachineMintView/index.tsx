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

  const [count, setCount] = useState<number>(1);

  const inc = () => {
    setCount(count + 1);
  };

  const dec = () => {
    if(count > 1) {
      setCount(count - 1);
    } else {
      alert("You can't mint less than one NFT!");
    }
  }

  return (
    <Layout>
      <a href="/" className="hidememobile" style={{position: 'absolute', width: '300px', height: '300px', left: '44%', cursor: 'pointer'}}></a>
      <div className="container marginTop370">
        <div className="row hidememobile">
        <div className="col-1"></div>
          <div className="col-3 text-right">
            <button className="btn_general" onClick={dec}><img src="/images/mint/mint_minus.png" /></button>
          </div>
          <div className="col-4 text-center">
            <div className="mint_count">
              <MintSection
                candyMachineId={candyMachineId}
                startDate={startDateSeed}
                txTimeout={txTimeout}
              />
              <input type="number" value={count} />
            </div>
          </div>
          <div className="col-3 text-left">
            <button className="btn_general" onClick={inc}><img src="/images/mint/mint_plus.png" /></button>
          </div>
          <div className="col-12 text-center">
            <button className="btn_mint"><img src="/images/mint/mint_button.png" /></button>
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
