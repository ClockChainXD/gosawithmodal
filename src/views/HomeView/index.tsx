import Link from "next/link";
import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

import { SolanaLogo } from "components";
import About from "./About";
import Showcase from "./Showcase";
import Faq from "./Faq";
import Home from "./Home";
import P2e from "./P2e";
import Tiers from "./Tiers";
import Team from "./Team";
import RoadMap from "./RoadMap";
import Layout from "../../../src/layouts/Layout";

export const HomeView: FC = ({}) => {
  const { publicKey } = useWallet();

  const onClick = () => {};

  return (
    <Layout>
      <Home />
      <About />
      <P2e />
      <Tiers />
      <RoadMap />
      <Showcase />
      <Faq />
      <Team />
    </Layout>
  );
};
