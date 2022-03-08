import { useEffect } from "react";
import { scroll_, stickyNav } from "../utils/utilits";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Header = () => {
  useEffect(() => {
    window.addEventListener("scroll", stickyNav);
    window.addEventListener("scroll", scroll_);
  });
  return (
    <div className="gosaa_tm_header">
      <div className="container">
        <div className="inner_">
          <div className="menu">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <a href="https://discord.com/invite/gosaverse" target="_blank"><img src="/images/social_icon_1.png" className="social_icon_ social_icon_big_1" style={{width:'30px', margin:'5px 5px 0 30px'}} /></a> <a href="https://twitter.com/GosaVerse" target="_blank"><img src="/images/social_icon_2.png" className="social_icon_ social_icon_big" style={{width:'30px', margin:'5px 5px 0 0'}} /></a>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="text-right">
              <WalletMultiButton className="wallet-button" />
              </div>
              </div>
            </div>

            <ul className="anchor_nav text-right">
              <li className="current">
                <a href="/breed">
                <img src="images/menus/btn_breeding.png" className="btn_width" alt="breeding engine image" />
                </a>
              </li>
              <li>
                <a href="/#about">
                <img src="images/menus/btn_gosa.png" className="btn_width" alt="gosa image" />
                </a>
              </li>
              <li>
                <a href="/#p2e">
                <img src="images/menus/btn_p2e.png" className="btn_width" alt="p2e image" />
                </a>
              </li>
              <li>
                <a href="/#tiers">
                <img src="images/menus/btn_tiers.png" className="btn_width" alt="tiers breeding image" />
                </a>
              </li>
              <li>
                <a href="/#roadmap">
                <img src="images/menus/btn_road_map.png" className="btn_width" alt="roadmap image" />
                </a>
              </li>
              <li>
                <a href="/#showcase">
                <img src="images/menus/btn_showcase.png" className="btn_width" alt="showcase image" />
                </a>
              </li>
              <li>
                <a href="/#faq">
                <img src="images/menus/btn_faq.png" className="btn_width" alt="faq image" />
                </a>
              </li>
              <li>
                <a href="/#team">
                <img src="images/menus/btn_team.png" className="btn_width" alt="team image" />
                </a>
              </li>
              <li>
                <a href="/mint/">
                <img src="images/menus/btn_mint.png" className="btn_width" alt="mint image" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
