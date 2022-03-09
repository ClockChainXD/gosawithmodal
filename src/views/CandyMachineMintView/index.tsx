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

const txTimeout = 50000; // milliseconds (confirm this works for your project)

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
      <div className="container marginTop370">
        <div className="row">
        <div className="col-1"></div>
          <div className="col-3 text-right">
            <span></span>
          </div>
          <div className="col-4 text-center">
            <div className="mint_count">
              <MintSection
                candyMachineId={candyMachineId}
                startDate={startDateSeed}
                txTimeout={txTimeout}
                count={count}
              />
              <input type="number" value={count} />
            </div>
          </div>
          <div className="col-3 text-left">
            <span></span>
          </div>
          <div className="col-12 text-center">
          {/* <button className="btn_mint"><img src="/images/mint/mint_button.png" /></button> */}
          </div>
          <div className="col-1"></div>
        </div>
       
    </div>
    </Layout>
  );
};
