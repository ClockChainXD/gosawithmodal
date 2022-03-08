import { useEffect, useState } from "react";
const Team = () => {
  useEffect(() => {
    let VanillaTilt = require("vanilla-tilt");
    VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
      maxTilt: 6,
      easing: "cubic-bezier(.93,.98,.52,.99)",
      speed: 500,
      transition: true,
    });
  }, []);
  return (
    <div className="gosaa_tm_section footer_bg" id="team">
        <div className="container">
          <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-8 text_center">
                <img src="/images/team/team.png" className="team_title show_case_title in layer" data-depth="0.6"  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <img src="/images/jelly-fish2_220.png" className="hidememobile right_ absolute_ moving_effect"
                data-direction="y"
                data-reverse="yes"  />
          </div>
        </div>
        <div className="team_bg show_case_padding_bottom">
          <div className="container">
            <div className="row team_padding">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 text_center col-6 linemobile">
                <img src="/images/team/team_atlas.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 text_center col-6 linemobile">
                <img src="/images/team/team_cree.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 text_center col-6 linemobile">
                <img src="/images/team/team_morpheus.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 text_center col-6 linemobile">
                <img src="/images/team/team_elrond.png" className="team_img tilt-effect"  />
              </div>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-8 text_center">
                <img src="/images/team/art.png" className="team_title show_case_title in layer" data-depth="0.6"  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <img src="/images/jelly-fish3_200.png" className="hidememobile left_ absolute_ moving_effect"
                data-direction="y"
                data-reverse="yes"  />
          </div>
        </div>
        <div className="art_bg show_case_padding_bottom">
          <div className="container">
            <div className="row team_padding">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/art_demigoddess.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/art_captain_ink.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/art_lilith.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/art_archangel.png" className="team_img tilt-effect" />
              </div>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text_center">
                <img src="/images/team/dev.png" className="team_title show_case_title in layer" data-depth="0.6"  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <img src="/images/jelly-fish4.png" className="hidememobile left_ absolute_ moving_effect"
                data-direction="y"
                data-reverse="yes" />
          </div>
        </div>
        <div className="dev_bg show_case_padding_bottom">
          <div className="container">
            <div className="row team_padding">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/dev_triumph.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/dev_taka.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/dev_zec.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/dev_ryuki.png" className="team_img tilt-effect" />
              </div>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text_center">
                <img src="/images/team/game_social.png" className="team_title show_case_title in layer" data-depth="0.6"  />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <img src="/images/jelly-fish0_left_220_.png" className=" hidememobile right_ absolute_ moving_effect"
                data-direction="y"
                data-reverse="yes" />
          </div>
        </div>
        <div className="game_bg show_case_padding_bottom">
          <div className="container">
            <div className="row team_padding">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/game_it_is_real.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/game_ant.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/game_cius.png" className="team_img tilt-effect" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 col-6 text_center linemobile">
                <img src="/images/team/game_neo_san.png" className="team_img tilt-effect" />
              </div>
            </div>
          </div>
        </div>


        <div className="social_media_bg show_case_padding_bottom">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text_center">
                <a href="https://discord.com/invite/gosaverse" target="_blank"><img src="/images/social_icon_1.png" className="social_icon_" /></a> <a href="https://twitter.com/GosaVerse" target="_blank"><img src="/images/social_icon_2.png" className="social_icon_" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_height"></div>



    </div>
  );
};

export default Team;
