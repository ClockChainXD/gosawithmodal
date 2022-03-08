import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const MobileMenu = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="gosaa_tm_mobile_menu">
      <div className="mobile_menu_inner">
        <div className="mobile_in">
          <div className="logo">
            <a href="/#">
              <img src="images/gosa_mobile_logo.png" />
            </a>
          </div>
          <div className="trigger">
            <div
              className={`hamburger hamburger--slider ${
                toggle ? "is-active" : ""
              }`}
            >
              <div className="hamburger-box" onClick={() => setToggle(!toggle)}>
                <div className="hamburger-inner" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="dropdown"
        style={{ display: `${toggle ? "block" : "none"}` }}
      >
        <div className="dropdown_inner">
          <ul className="anchor_nav">
            <li className="current">
              <a onClick={() => setToggle(false)} href="/breed">
                BREEDING ENGINE
              </a>
            </li>
            <li>
              <a onClick={() => setToggle(false)} href="/#about">
                G.O.S.A WORLD
              </a>
            </li>
            <li>
              <a onClick={() => setToggle(false)} href="/#p2e">
                P2E
              </a>
            </li>
            <li>
              <a onClick={() => setToggle(false)} href="/#tiers">
                TIERS & BREEDING
              </a>
            </li>
            <li>
              <a onClick={() => setToggle(false)} href="/#roadmap">
                ROADMAP
              </a>
            </li>
            <li>
              <a onClick={() => setToggle(false)} href="/#showcase">
                SHOWCASE
              </a>
            </li>
            <li>
              <a onClick={() => setToggle(false)} href="/#faq">
                FAQ
              </a>
            </li>
            <li>
              <a onClick={() => setToggle(false)} href="/#team">
                TEAM
              </a>
            </li>
            <li>
              <a onClick={() => setToggle(false)} href="/mint">
                MINT
              </a>
            </li>
            <li>
            <a href="https://discord.com/invite/gosaverse" target="_blank"><img src="/images/social_icon_1.png" className="social_icon_ social_icon_mobile" /></a> <a href="https://twitter.com/GosaVerse" target="_blank"><img src="/images/social_icon_2.png" className="social_icon_ social_icon_mobile" /></a>
            </li>
          </ul>
          <WalletMultiButton />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
