import Link from "next/link";
import { FC, useEffect, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";
import Layout from "../../../src/layouts/Layout";
import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  getCandyMachineState,
  mintOneTokenNew,
} from "views/CandyMachineMintView/candy-machine";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useAlert } from "react-alert";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TOKEN_METADATA_PROGRAM_ID } from "../CandyMachineMintView/candy-machine";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import ModalBox from "./ModalBox.js";
import Select from "react-select";

interface Metadata {
  name: string;
  symbol: string;
  image: string;
  attributes: Attributes[];
  properties: Properties;
  collection: { name: string; family: string };
  tokenMintAddress: string;
  tokenAccountAddress: string;
}
interface Properties {
  files: { uri: string; type: string }[];
  category: string;
  creators: { address: string; share: string }[];
}
interface Attributes {
  trait_type: string;
  value: string;
}
export const BreedingView: FC = ({ }) => {
  const allCandyMachineIds = [
    "6A5tcH54CVkUsmT71scLMsPdp35bVm92yRXQh8C9TgeQ", // 0 : starter - primary
    "8osk4QHb2r3nsBasvrVC2nDnAz4SqUhcvx8tMagNDKbP", // 1 : organic - bred - lumies
    "Fufq92DNGj8HkHU3Gd8VeCfoqmWKGFsE8wSsCgAP8Ry9", // 2 : organic - bred - legendary
    "2s7yzuSs5yFT5iy1V5rnSaJPbw4uSPiALT8hLFPqX64L", // 3 : organic - bred - super rare
    "7SJL5BSwGduRiki9QicF5ZbjfWdx6qqNtRSBvJpTRt8X", // 4 : organic - bred - rare
    "9r3eTVzGEmKtzmYpVNkJvxrGpCcwyMFWh6MmnF6i4b3U", // 5 : organic - bred - spectacular
    "DFpXZKLXNEnq91uyVgG2aTaE77vMv29FtZ5Fk1wzddKA", // 6 : organic - bred - uncommon

    "boW52EGwyMyKEPek2Nj7BbRo7s4H1gjp7aLfXPoheQC", // 7 : robot - bred - lumies
    "2GWVCJ9aALPd3ka5XRPd4gUZNE4Dtma4WWidU693Hefy", // 8 : robot - bred - legendary
    "7SVcy2KPwZSD9aFY4Cim97f6vCkJi3pvPjzwa8AfpXJq", // 9 : robot - bred - super rare
    "8GcNJHnuji4FKLabF4vsJ6au7sC52VwvsQMJiY9FFegY", // 10 : robot - bred - rare
    "9PjVhegxLvKEu7ediRQvGuArVG27WG5pgzy772wt5MgN", // 11 : robot - bred - spectacular
    "Aft8to2pHT7cTDDp3DAdwHG3MNQG5FSzrDoF6UVfvYES", // 12 : robot - bred - uncommon

    "68y7mSSnQp5J5kBq3wsjaGjjmTY1yDD3DoFpSwjS33hQ", // 13 : cyborgExt - lumies
    "HgHKNeFNFx5CeThZwL3Wy98hBiuUoNeeTpAvXBBT3sY6", // 14 : cyborgExt - legendary
    "7wzr8MZ96KBm8YxVNV2W38pBZXvXPpmSJqdQBuCGXVV8", // 15 : cyborgExt - super rare

    "68y7mSSnQp5J5kBq3wsjaGjjmTY1yDD3DoFpSwjS33hQ", // 16 : cyborg - lumies
    "HgHKNeFNFx5CeThZwL3Wy98hBiuUoNeeTpAvXBBT3sY6", // 17 : cyborg - legendary
  ];

  const candyMachines = {
    Starter: {
      primary: 0, // organic - primary
    },
    Organic: {
      bred: {
        Lumies: 1, // organic - bred - lumies
        Legendary: 2, // organic - bred - legendary
         // organic - bred - super rare
        Rare: 4, // organic - bred - rare
        Spectacular: 5, // organic - bred - spectacular
        Uncommon: 6,
        'Super Rare': 3, // organic - bred - uncommon
      },
    },
    Robot: {
      bred: {
        Lumies: 7, // robot - bred - lumies
        Legendary: 8, // robot - bred - legendary
        // robot - bred - super rare
        Rare: 10, // robot - bred - Rare
        Spectacular: 11, // robot - bred - Spectacular
        Uncommon: 12,
        "Super Rare": 9, // robot - bred - Uncommon
      },
    },
    CyborgExt: {
      bred: {
        Lumies: 13, // cyborgExt - Lumies
        Legendary: 14, // cyborgExt - Legendary
        "Super Rare": 15, // cyborgExt - super rare
      },
    },
    Cyborg: {
      bred: {
        Lumies: 16, // cyborg - lumies
        Legendary: 17, // cyborg - legendary
      },
    },
  };

  const parentToChildTier = {
    Legendary: "Lumies",
    Rare: "Super Rare",
    Spectacular: "Rare",
    Uncommon: "Spectacular",
    Common: "Uncommon",
    'Super Rare': "Legendary",

  };

  const txTimeout = 30000;

  const [metadata, setmetaData] = useState<Metadata>();
  const [isBreeding, setIsBreeding] = useState<Boolean>(false);

  const wallet = useAnchorWallet();
  const alert = useAlert();
  const { connection } = useConnection();

  const [holdingNftDetails, setHoldingNftDetails] = useState<
    Metadata[] | undefined
  >();
 

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
  const fetchData = async (jsonUrl: any) => {
    const req = await fetch(jsonUrl);
    const newData = await req.json();

    return setmetaData(newData);
  };
  const handleSameClick = (event: any) => {
    //event.preventDefault();
    fetchData(event);
    console.log(metadata);
  };

  useEffect(() => {
    fetchNftDetails();
  }, [connection, wallet]);

  async function fetchNftDetails() {
    if (!connection || !wallet) return;

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      wallet.publicKey,
      {
        programId: TOKEN_PROGRAM_ID,
      }
    );
    const nftAccounts = tokenAccounts?.value?.filter(
      (obj) =>
        obj.account.data.parsed.info.tokenAmount.uiAmount === 1 &&
        obj.account.data.parsed.info.tokenAmount.decimals === 0
    );
    // console.log(nftAccounts);
    nftAccounts.map(async (element) => {
      const nftMintAddress = element.account.data.parsed.info.mint;
      const metadataAddress = await PublicKey.findProgramAddress(
        [
          Uint8Array.from("metadata", (e) => e.charCodeAt(0)),
          new PublicKey(TOKEN_METADATA_PROGRAM_ID).toBytes(),
          new PublicKey(nftMintAddress).toBytes(),
        ],
        new PublicKey(TOKEN_METADATA_PROGRAM_ID)
      );
      const metadataAccount = await connection.getParsedAccountInfo(
        metadataAddress[0]
      );
      let data = metadataAccount?.value?.data;
      // let name = data.slice(69, 101).toString().replace(/\0/g, "");
      // let symbol = data.slice(105, 115).toString().replace(/\0/g, "");
      let uri = data?.slice(119, 319).toString().replace(/\0/g, "");
      //console.log(data?.toString('utf-8'));
      /* console.log(uri); */
      // let sellerFeeBasisPoints = (data[320] << 8) + data[319];
     // const candyMachineId = data?.slice(326, 358).toString()
     // var strg = Utf8ArrayToStr(candyMachineId)

    //  console.log("candymchacindi: ", strg)
     // if(allCandyMachineIds.find(element => element == candyMachineId) === undefined) return;
      var req = new XMLHttpRequest();
      req.overrideMimeType("application/json");
      req.open("GET", uri!, true);
      req.onload = function () {
        var nftDetail: Metadata = JSON.parse(req.responseText);
        nftDetail!.tokenMintAddress = nftMintAddress;
        nftDetail.tokenAccountAddress = element.pubkey.toString();
        /*setHoldingNftDetails((prevDetails) =>
          prevDetails ? [...prevDetails, nftDetail] : [nftDetail]
        ); */
        if(holdingNftDetails){
          setHoldingNftDetails(holdingNftDetails.filter((currentNft) => {
            if(currentNft.tokenMintAddress!=nftDetail.tokenMintAddress && currentNft.tokenAccountAddress!=nftDetail.tokenAccountAddress){
              console.log("hold", currentNft)
              return currentNft
            }
          }))
        } else {
          setHoldingNftDetails((prevDetails) => {
            let uniqs= prevDetails?.filter((current) => 
            {
              if(current.tokenMintAddress!=nftDetail.tokenMintAddress && current.tokenAccountAddress!=nftDetail.tokenAccountAddress)
              return current

              
          })
          return (uniqs ? [...uniqs, nftDetail] : [nftDetail])
          }
          )
        
        
        }
        console.log(nftDetail);
      };
      req.send(null);
    });
  }
  function readTraitValue(nft: Metadata, traitType: string) {
    if (nft) {
      if (!nft.attributes) return "empty";
      else {
        let value = nft.attributes.find(
          (element) => element.trait_type === traitType
        )?.value;
        return value ? value : "empty";
      }
    }
  }
  
  const selectNft1Func = (event, nft) => {
    console.log("select nft 1 evnt")
    // burda seçili nftyi çıkar diğer arrayden
    selectNft1(nft);
    console.log(nft)
  }

  const selectNft2Func = (event, nft) => {
    console.log("select nft 2 evnt")
    selectNft2(nft);
    event.target.style.border = "2px solid #0071c5;"
    console.log(event.target)
  }

  const handleBreedClick = async () => {
    if(!wallet) {
      alert.error("Please connect wallet!");
      return;
  }
  if(isBreeding === true) {
      alert.error("Minting process is running now!");
      return;
  }
  if(!selectedNft1 || !selectedNft2) {
      alert.error("Parent Nfts are not valid!");
      return;
  }

  console.log("error is not here:")

 /*  if(parentNftA === parentNftB) {
      alert("Please select 2 nfts to breed!");
      return;
  } */
  const tierA = readTraitValue(selectedNft1, 'Tier');
  const tierB = readTraitValue(selectedNft2, 'Tier');

  if(!tierA || !tierB){
    alert.error("Tiers are undefined")
    return
  }
  if(tierA != tierB) {
      alert.error("The tiers should be matched!");
      return;
  }
  console.log("tierA:",tierA)

  setIsBreeding(true);
    alert.show("Breeding has been started!");

    console.log("tierA:",holdingNftDetails)

    const collectionA = selectedNft1.collection.family.includes('Robot') ? 'Robot' : selectedNft1.collection.family.includes('Organic') ? 'Organic' : 'Cyborg'  ;
    const collectionB =  selectedNft2.collection.family.includes('Robot') ? 'Robot' : selectedNft2.collection.family.includes('Organic') ? 'Organic' : 'Cyborg' 
    if((collectionA === 'Cyborg' || collectionB === 'Cyborg') && collectionA !== collectionB) {
        alert.error("These collections can't be bred!");
        return;
    }
    const collectionC = (collectionA === collectionB) ? collectionA : 'CyborgExt';

    if((parentToChildTier[tierA]=== undefined) && collectionC !== 'CyborgExt') {
        alert.error("Can't breed from this tier!");
        return;
    }
    const tierC = (collectionC === 'CyborgExt') ? tierA : parentToChildTier[tierA];
    console.log("Tierrrrr: ",tierC)
    const breedCandyMachine = candyMachines[collectionC]['bred'][tierC];
    if(breedCandyMachine === undefined) {
        alert.error("Can't breed from this tier!");
        return;
    }
    console.log(anchorWallet)
    console.log(breedCandyMachine)
    const breedTierStatus = await getCandyMachineState(anchorWallet!, new PublicKey(allCandyMachineIds[breedCandyMachine]),connection);
    console.log("BreedTier:",breedTierStatus)
    const breedTierRemaining = breedTierStatus?.state.itemsRemaining;
    if(breedTierRemaining === 0) {
        alert.info("SOLD OUT!");
        return;
    }
    console.log(allCandyMachineIds[breedCandyMachine]);
    try {
        setIsBreeding(true);
        if (wallet ) {
            const burns = [
                {
                    tokenAccountAddress: selectedNft1.tokenAccountAddress,
                    tokenMintAddress: selectedNft1.tokenMintAddress,
                },
                {
                    tokenAccountAddress: selectedNft2.tokenAccountAddress,
                    tokenMintAddress: selectedNft2.tokenMintAddress,
                },
            ];
            const mintTxId = (
              await mintOneTokenNew(breedTierStatus!, wallet!.publicKey,burns)
            )[0];


            const status = await awaitTransactionSignatureConfirmation(
              mintTxId!,
              txTimeout,
              connection,
              true
            );

            if (!status?.err) {
                alert.success("Congratulations! Mint succeeded!");
            } else {
                alert.error("Mint failed! Please try again!");
            }
        }
    } catch (error: any) {
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
            } else if (error.code === 312) {
                message = `Minting period hasn't started yet.`;
            }
        }

        alert.error(message);
    } finally {
        setIsBreeding(false);
        fetchNftDetails();
    }

  }

/* 
  const handleBreedClick = async () => {
    if (!wallet) {
      alert.error("Please connect wallet!");
      return;
    }
    if (isBreeding === true) {
      alert.error("Minting process is running now!");
      return;
    }
    if (!selectedNft1 || !selectedNft2) {
      alert.error("Parent Nfts are not valid!");
      return;
    }
    console.log("error is not here:");

  
    const tierA = readTraitValue(selectedNft1, "TIER");
    const tierB = readTraitValue(selectedNft2, "TIER");
    if (!tierA || !tierB) {
      alert.error("Tiers are undefined");
      return;
    }
    if (tierA != tierB) {
      alert.error("The tiers should be matched!");
      return;
    }
    console.log("tierA:", tierA);

    setIsBreeding(true);
    alert.show("Breeding has been started!");

    console.log("tierA:", holdingNftDetails);

    const collectionA = selectedNft1.collection.family.includes(
      "Robot"
    )
      ? "Robot"
      : selectedNft1.collection.family.includes("Organic")
        ? "Organic"
        : "Cyborg";
    const collectionB = selectedNft2.collection.family.includes(
      "Robot"
    )
      ? "Robot"
      : selectedNft2.collection.family.includes("Organic")
        ? "Organic"
        : "Cyborg";
    if (
      (collectionA === "Cyborg" || collectionB === "Cyborg") &&
      collectionA !== collectionB
    ) {
      alert.error("These collections can't be bred!");
      return;
    }
    const collectionC = collectionA === collectionB ? collectionA : "CyborgExt";
    if (parentToChildTier[tierA] === undefined && collectionC !== "CyborgExt") {
      alert.error("Can't breed from this tier!");
      return;
    }
    const tierC = collectionC === "CyborgExt" ? tierA : parentToChildTier[tierA];
    const breedCandyMachine = candyMachines[collectionC]["bred"][tierC];
    if (breedCandyMachine === undefined) {
      alert.error("Can't breed from this tier!");
      return;
    }
    console.log(anchorWallet);
    const breedTierStatus = await getCandyMachineState(
      anchorWallet!,
      new PublicKey(allCandyMachineIds[breedCandyMachine]),
      connection
    );
    console.log("BreedTier:", breedTierStatus);
    const breedTierRemaining = breedTierStatus?.state.itemsRemaining;
    if (breedTierRemaining === 0) {
      alert.info("SOLD OUT!");
      return;
    }
    console.log(allCandyMachineIds[breedCandyMachine]);
    try {
      console.log("Selected 1: ",selectedNft1)
      console.log("Selected 2: ",selectedNft2)

      setIsBreeding(true);
      if (wallet) {
        const burns = [
          {
            tokenAccountAddress: selectedNft1.tokenAccountAddress,
            tokenMintAddress: selectedNft1.tokenMintAddress,
          },
          {
            tokenAccountAddress: selectedNft2.tokenAccountAddress,
            tokenMintAddress: selectedNft2.tokenMintAddress,
          },
        ];
        const mintTxId = (
          await mintOneToken(breedTierStatus!, wallet!.publicKey, burns)
        )[0];

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId!,
          txTimeout,
          connection,
          true
        );

        if (!status?.err) {
          alert.success("Congratulations! Mint succeeded!");
        } else {
          alert.error("Mint failed! Please try again!");
        }
      }
    } catch (error: any) {
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
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      alert.error(message);
    } finally {
      setIsBreeding(false);
      fetchNftDetails();
    }
  }; */


  const [modal, setModal] = useState(0);
  const hidden = (value: any) => (value === modal ? "" : "news_hidden_details");
  const [close, setClose] = useState<boolean>(false);
  const [close2, setClose2] = useState<boolean>(false);
  const [selectedNft1, selectNft1] = useState<Metadata>()
  const [selectedNft2, selectNft2] = useState<Metadata>()
  const onClose = (x: boolean) => {
    console.log("onclose func")
    setClose(x);
    setClose2(x);
    console.log(close2)
  };

  return (
    <Layout>
      <a
        href="/"
        className="hidememobile"
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          left: "44%",
          cursor: "pointer",
        }}
      ></a>
      <div className="container breeding_top container_bg modalboxx">
        <div className="row breed_imgs">
          <div className="col-4 text_right">
            <img src="/images/breed/breeding_left_2.png" />
          </div>
          <div className="col-4 text_center breed_atom">
            <img
              style={{ animation: `spin 20s linear infinite` }}
              src="/images/breed/breeding_atom.png"
            />
          </div>
          <div className="col-4 text_left">
            <img src="/images/breed/breeding_right_2.png" />
          </div>
        </div>
        <div className="row hidememobile buttonmargin">
          <div
            className="col-4 text_center breeding_char_bg pointer"
            onClick={() => {
              console.log("click 1")
              setClose(true);
            }}
            style={{ width: "317px", height: "176px" }}
          >{ selectedNft1 && <img src={selectedNft1["image"]} style={{height: "132px", margin: '35px auto 0 auto'}}></img>}</div>
            <div className="text_center">
            <div className={close ? "aali_tm_modalbox opened" : "aali_tm_modalbox"}>
                <div className="box_inner">
                  <div className="close">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setClose(false);
                        onClose(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 511.995 511.995"
                        style={{ enableBackground: "new 0 0 511.995 511.995" }}
                        xmlSpace="preserve"
                        className=" replaced-svg modalCloseSvg"
                      >
                        <g>
                          <g>
                            <path d="M437.126,74.939c-99.826-99.826-262.307-99.826-362.133,0C26.637,123.314,0,187.617,0,256.005    s26.637,132.691,74.993,181.047c49.923,49.923,115.495,74.874,181.066,74.874s131.144-24.951,181.066-74.874    C536.951,337.226,536.951,174.784,437.126,74.939z M409.08,409.006c-84.375,84.375-221.667,84.375-306.042,0    c-40.858-40.858-63.37-95.204-63.37-153.001s22.512-112.143,63.37-153.021c84.375-84.375,221.667-84.355,306.042,0    C493.435,187.359,493.435,324.651,409.08,409.006z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M341.525,310.827l-56.151-56.071l56.151-56.071c7.735-7.735,7.735-20.29,0.02-28.046    c-7.755-7.775-20.31-7.755-28.065-0.02l-56.19,56.111l-56.19-56.111c-7.755-7.735-20.31-7.755-28.065,0.02    c-7.735,7.755-7.735,20.31,0.02,28.046l56.151,56.071l-56.151,56.071c-7.755,7.735-7.755,20.29-0.02,28.046    c3.868,3.887,8.965,5.811,14.043,5.811s10.155-1.944,14.023-5.792l56.19-56.111l56.19,56.111    c3.868,3.868,8.945,5.792,14.023,5.792c5.078,0,10.175-1.944,14.043-5.811C349.28,331.117,349.28,318.562,341.525,310.827z" />
                          </g>
                        </g>

                      </svg>
                    </a>
                  </div>
                  <div className="description_wrap">
                    <div className="news_popup_informations">
                      <div className="details">
                        <h3 className="title">Select NFT</h3>
                        <div />
                      </div>
                      <div className="text">
                        <p>NFT List 2</p>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        {holdingNftDetails &&
                          holdingNftDetails.map(
                            (nft, key) =>
                              nft && nft !== selectedNft2 ? (
                                
                                <div className="col-2" key={key}>
                                  <div className={selectedNft1 === nft ? "card-selected": "card"}>
                                    <img className="card-img-top" src={nft["image"]} onClick={(event) => selectNft1Func(event, nft)}></img>
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item">
                                        {" "}
                                        <b>Tier: </b> {nft["attributes"][0]["value"]}{" "}
                                      </li>
                                      <li className="list-group-item">
                                        {" "}
                                        <b>Rank: </b> {nft["attributes"][0]["value"]}{" "}
                                      </li>
                                      <li className="list-group-item">
                                        {" "}
                                        <b>Type: </b>{" "}
                                        {nft["collection"]["family"].includes("Organic")
                                          ? "Organic"
                                          : nft["collection"]["family"].includes("Robot")
                                            ? "Robot"
                                            : "Cyborg"}{" "}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              ) : <></>
                          )}
                      </div>
                    </div>
                    <button className="btn btn-primary btn-lg active" style={{ fontSize: '20px', borderRadius: '6px' }} onClick={() => { setClose(false) }} >Save</button>

                  </div></div>
            <div
              className="div_middle"
              style={{ width: "317px", height: "176px" }}
            >
              {selectedNft1 && (
                <img src={selectedNft1["image"]}></img>
              )}
            </div>
            </div>
          </div>
          <div className="col-4 text_center">
            <button
              className="btn_breed"
              onClick={async () => await fetchNftDetails()}
            >
              <img src="/images/breed/breeding_same_button_2.png" />
            </button>
            <button
              className="btn_breed"
              onClick={async () => await fetchNftDetails()}
            >
              <img src="/images/breed/breeding_cross_button_2.png" />
            </button>
            <button
              className="btn_breed"
              onClick={async () => await handleBreedClick()}
            >
              <img src="/images/breed/breeding_breed_button_2.png" />
            </button>
          </div>
          <div
            className="col-4 text_center breeding_char_bg pointer"
            onClick={(e) => {
              e.preventDefault()
              console.log("click")
              setClose2(true);
            }}
            style={{ width: "317px", height: "176px" }}
          >{selectedNft2 && <img src={selectedNft2["image"]} style={{height: "132px", margin: '35px auto 0 auto'}}></img>}</div>
        
            <div className="text_center">

              <div className={close2 ? "aali_tm_modalbox opened" : "aali_tm_modalbox"}>
                <div className="box_inner">
                  <div className="close">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setClose2(false);
                        onClose(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 511.995 511.995"
                        style={{ enableBackground: "new 0 0 511.995 511.995" }}
                        xmlSpace="preserve"
                        className=" replaced-svg modalCloseSvg"
                      >
                        <g>
                          <g>
                            <path d="M437.126,74.939c-99.826-99.826-262.307-99.826-362.133,0C26.637,123.314,0,187.617,0,256.005    s26.637,132.691,74.993,181.047c49.923,49.923,115.495,74.874,181.066,74.874s131.144-24.951,181.066-74.874    C536.951,337.226,536.951,174.784,437.126,74.939z M409.08,409.006c-84.375,84.375-221.667,84.375-306.042,0    c-40.858-40.858-63.37-95.204-63.37-153.001s22.512-112.143,63.37-153.021c84.375-84.375,221.667-84.355,306.042,0    C493.435,187.359,493.435,324.651,409.08,409.006z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M341.525,310.827l-56.151-56.071l56.151-56.071c7.735-7.735,7.735-20.29,0.02-28.046    c-7.755-7.775-20.31-7.755-28.065-0.02l-56.19,56.111l-56.19-56.111c-7.755-7.735-20.31-7.755-28.065,0.02    c-7.735,7.755-7.735,20.31,0.02,28.046l56.151,56.071l-56.151,56.071c-7.755,7.735-7.755,20.29-0.02,28.046    c3.868,3.887,8.965,5.811,14.043,5.811s10.155-1.944,14.023-5.792l56.19-56.111l56.19,56.111    c3.868,3.868,8.945,5.792,14.023,5.792c5.078,0,10.175-1.944,14.043-5.811C349.28,331.117,349.28,318.562,341.525,310.827z" />
                          </g>
                        </g>

                      </svg>
                    </a>
                  </div>
                  <div className="description_wrap">
                    <div className="news_popup_informations">
                      <div className="details">
                        <h3 className="title">Select NFT</h3>
                        <div />
                      </div>
                      <div className="text">
                        <p>NFT List 2</p>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        {holdingNftDetails &&
                          holdingNftDetails.map(
                            (nft, key) =>
                              nft && nft !== selectedNft1 ? (
                                <div className="col-2" key={key}>
                                  <div className={selectedNft2 === nft ? "card-selected": "card"}>
                                    <img className="card-img-top" src={nft["image"]} width="100%" onClick={(event) => selectNft2Func(event, nft)}></img>
                                    <ul className="list-group list-group-flush">
                                      <li className="list-group-item">
                                        {" "}
                                        <b>Tier: </b> {nft["attributes"][0]["value"]}{" "}
                                      </li>
                                      <li className="list-group-item">
                                        {" "}
                                        <b>Rank: </b> {nft["attributes"][0]["value"]}{" "}
                                      </li>
                                      <li className="list-group-item">
                                        {" "}
                                        <b>Type: </b>{" "}
                                        {nft["collection"]["family"].includes("Organic")
                                          ? "Organic"
                                          : nft["collection"]["family"].includes("Robot")
                                            ? "Robot"
                                            : "Cyborg"}{" "}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              ) : <></>
                          )}
                      </div>
                    </div>
                    <button className="btn btn-primary btn-lg active" style={{ fontSize: '20px', borderRadius: '6px' }} onClick={() => { setClose2(false) }} >Save</button>

                  </div></div>
              </div>
              </div>
            </div>
          </div>
          <div className="row showmemobile">
            <div className="col-12 text_center greybox">
              You can <strong>BREED</strong> at bigger than 1024x768 resolution!!!
            </div>
          </div>
    </Layout>
  );
};
