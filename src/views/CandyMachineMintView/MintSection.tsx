import { useEffect, useMemo, useState } from "react";
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
} from "./candy-machine";
import { formatNumber, toDate } from "./utils";

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  startDate: number;
  txTimeout: number;
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

  const [discountPrice, setDiscountPrice] = useState<number| undefined>();


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
  const onMint = async () => {
    try {
      setIsMinting(true);
      alert.show("Mint has been started!");

    
        const mintTxId = (
          await mintOneToken(candyMachine!, wallet!.publicKey,undefined)
        )[0];

        alert.show("Confirming transaction...");

        let status: any = { err: true };
        if (mintTxId) {
          status = await awaitTransactionSignatureConfirmation(
            mintTxId,
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
    
          const itemsRemaining=state.itemsRemaining
        setIsSoldOut(state.itemsRemaining === 0);
        setStartDate(toDate(state.goLiveDate));
        setCandyMachine(cndy);
        setCounter({
          itemsAvailable,
          itemsRemaining
        });
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
              disabled={isSoldOut || isMinting || !isActive}
              onClick={onMint}
              className="btn btn-primary btn-wide btn-lg"
            >
              {isSoldOut ? (
                "SOLD OUT"
              ) : isActive ? (
                isMinting ? (
                  <Loader noText={true} />
                ) : (
                  `MINT for ◎${price}`
                )
              ) : (
                <Countdown
                  date={startDate}
                  onMount={({ completed }) => completed && setIsActive(true)}
                  onComplete={() => setIsActive(true)}
                  renderer={renderCounter}
                />
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  if (!seconds) return <span>Loading...</span>;
  return (
    <span>
      {hours} hours, {minutes} minutes, {seconds} seconds
    </span>
  );
};
