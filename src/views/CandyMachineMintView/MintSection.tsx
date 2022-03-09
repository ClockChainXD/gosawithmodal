import { useCallback, useEffect, useMemo, useState } from "react";
import Countdown from "react-countdown";
import { useConnection } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { useAlert } from "react-alert";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { Loader, SelectAndConnectWalletButton } from "components";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import {
  CandyMachineAccount,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
 mintOneToken,
  shortenAddress,
//  mintMultipleTokens
} from "./candy-machine";
import { formatNumber, getAtaForMint, toDate } from "./utils";
import { MintLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  startDate: number;
  txTimeout: number;
  count: number;
}

export const MintSection = (props: HomeProps) => {
  const alert = useAlert();
  const { connection } = useConnection();
  const [counter, setCounter] = useState({
    itemsAvailable: 0,
    itemsRemaining: 0,
  });
  const [price, setPrice] = useState<number>();
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(props.startDate));
  const [isPresale,setIsPresale] = useState(false);
  const [discountPrice, setDiscountPrice] = useState<number| undefined>();
  const [isWhitelistUser,setIsWhitelistUser]=useState(false);

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const onMint = async (amount:number) => {
     try {
      setIsMinting(true);
      alert.show("Mint has been started!");

    
        const mintTxId = (
          await mintOneToken(candyMachine!, wallet!.publicKey,undefined)
        );
        
        alert.show("Confirming transaction...");

        let status: any = { err: true };
        if (mintTxId[0]) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId[0],
            props.txTimeout,
            connection,
            true,
          );
        }

        if (!status?.err) {
          alert.success("Congratulations! Mint succeeded!");
        } else {
          alert.error("Mint failed! Please try again!");
        }
      
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      alert.error(message);
    } finally {
      if (wallet) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
    } 
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, connection]);

  useEffect(() => {
    (async () => {
      if (!wallet) return;

      try {
        const cndy = await getCandyMachineState(
          anchorWallet!,
          props.candyMachineId,
          connection,
        );
        const {
          id,program,state
        } =  await getCandyMachineState(
          anchorWallet!,
          props.candyMachineId,
          connection,
        );
    const itemsAvailable=state.itemsAvailable
    let active = true
    cndy?.state.goLiveDate?.toNumber() < new Date().getTime() / 1000;
    let presale = false;
          const itemsRemaining=state.itemsRemaining
        setIsSoldOut(state.itemsRemaining === 0);
        setStartDate(toDate(state.goLiveDate));
        setCandyMachine(cndy);
        setCounter({
          itemsAvailable,
          itemsRemaining
        });
        const mint = new anchor.web3.PublicKey(
          cndy.state.whitelistMintSettings!.mint,
        );
        const token = (await getAtaForMint(mint, anchorWallet!.publicKey))[0];

        if (cndy?.state.whitelistMintSettings) {
          // is it a presale mint?
          if (
            cndy.state.whitelistMintSettings.presale &&
            (!cndy.state.goLiveDate ||
              cndy.state.goLiveDate.toNumber() > new Date().getTime() / 1000)
          ) {
            presale = true;
          }
          
    
          try {
            const balance = await connection.getTokenAccountBalance(
              token,
            );
            let valid = parseInt(balance.value.amount) > 0;
            // only whitelist the user if the balance > 0
            setIsWhitelistUser(valid);
            active = (presale && valid) || active;
            
          } catch (e) {
            setIsWhitelistUser(false);
            // no whitelist user, no mint
            if (cndy.state.isWhitelistOnly) {
              active = false;
            }
            console.log('There was a problem fetching whitelist token balance');
            console.log(e);
          }
        }
        if (state.whitelistMintSettings?.discountPrice) {
          setDiscountPrice(state?.whitelistMintSettings?.discountPrice.toNumber() / LAMPORTS_PER_SOL);
        } else {
          setDiscountPrice(undefined);
        }
        setPrice(formatNumber.asNumber(state?.price));
      } catch (error) {
        console.error(error);

        alert.error(
          "Error fetching CandyMachine. Check browser console for the details."
        );
      }
    })();
  }, [wallet, props.candyMachineId, connection]);

  console.log("startDate", startDate);

  return (
    <main>
 

      <div className={`grid grid-cols-1 gap-4`}>
        <div>
          {wallet && <p>Balance: ◎{(balance || 0).toLocaleString()}</p>}

          {counter?.itemsAvailable ? (
            <>
              {counter?.itemsRemaining} of {counter?.itemsAvailable} Available
            </>
          ) : null}
        </div>
        <div>
          {!wallet ? (
            <SelectAndConnectWalletButton onUseWalletClick={() => {}} />
          ) : (
 
            <button
              disabled={isSoldOut || isMinting }
              onClick={async () => await onMint(props.count)}
              className="btn btn-primary btn-wide btn-lg"
            >
              {isSoldOut ? (
                "SOLD OUT"
              ) :  (
                isMinting ? (
                  <Loader noText={true} />
                ) : (
                  `MINT for ${isWhitelistUser
                    ? `◎ ${discountPrice}`
                    : `◎ ${price
                      }`} `
                )
              )

            }
            </button>
          )}
        </div>
      </div>
    </main>
  );
};


