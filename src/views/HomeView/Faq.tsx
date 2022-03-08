import { useState } from "react";
import ModalBox from "./ModalBox";

const Faq = () => {
  const faqs = [
    {
        id: 1,
        name: "What is G.O.S.A",
        content: "GOSA is a Multifunctional NFT Collection of Galactic Nft Assets built using Solana Blockchain Technology"
    },
    {
        id: 2,
        name: "How many GOSA NFTs can we mint at once?",
        content: "Mint transaction is limited to a maximum of 10 GOSA NFTs per transaction. (Not limited per wallet)"
    },
    {
        id: 3,
        name: "Which wallets are supported for Mint?",
        content: "GOSA mint transaction will be done using Phantom Wallet,Sollet and more"
    },
    {
        id: 4,
        name: "How many NFT’s does the GOSA collection consists?",
        content: "GOSA consists of a total of 3 species, Cyborgs that will come from the breeding process."
    },
    {
        id: 5,
        name: "How many traits will be in the GOSA collection?",
        content: "G.O.S.A will be randomly generated from more than 900 traits."
    },
    {
        id: 6,
        name: "Will we be able to trade GOSA NFTs in secondary markets?",
        content: "After Mint process, you can easily trade all GOSA NFTs in agreed markets (eg Solanart, Magic Eden, SolSea)"
    },
    {
        id: 7,
        name: "How many NFT’s does the GOSA collection consists?",
        content: "Genesis Collection consists of 10240 Galactic Nft Assets, 5120 pieces are Organic and 5120 pieces are Robots."
    },
    {
        id: 8,
        name: "Will we be able to trade Cyborg NFTs from the breeding process in the markets?",
        content: "Since Organic, Robot and Cyborg NFT assets are part of the GOSA project, they can be traded in secondary markets under a single collection."
    },
    {
        id: 9,
        name: "Where can I mint GOSA NFTs?",
        content: "Mint process of GOSA NFTs will take place on our own website."
    },
    {
        id: 10,
        name: "How many Cyborg NFTs can be obtained with the Breeding engine.",
        content: "In case of all breeding transformations, there will be 2090 CYBORG NFTs in the ecosystem."
    },
];
  const [modal, setModal] = useState(0);
  const hidden = (value:any) => (value === modal ? "" : "news_hidden_details");
  return (
    <div className="gosaa_tm_section" id="faq">
      <div className="gosaa_tm_news">
      <div className="container">
          <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text_center">
                <img src="/images/faq/faq.png" className="show_case_title in layer" data-depth="0.6" />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="hidememobile col-xl-1 col-lg-2 col-md-1 col-sm-12"></div>
            <div className="col-xl-10 col-lg-8 col-md-10 col-sm-12">
            <div className="row">
              {faqs.map(faq =>(
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12" key={faq.id}>
                <a href="#faq" onClick={() => setModal(faq.id)} ><img src={`/images/faq/faq${faq.id}.png`} className="faq_img" /></a>
                <div className={hidden(faq.id)}>
                  <ModalBox >
                    <div className="news_popup_informations text_center">
                      <div className="text">
                        <p>
                        {faq.content}
                        </p>
                      </div>
                    </div>
                  </ModalBox>
                </div>
                </div>
              ))}
            </div>
            </div>
            <div className="hidememobile col-xl-1 col-lg-2 col-md-1 col-sm-12">

            </div>
        </div>
      </div>

    </div>
    </div>
  );
}

export default Faq;