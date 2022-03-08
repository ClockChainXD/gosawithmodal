import { useEffect, useState } from "react";


const Tiers = () => {
  useEffect(() => {
    let VanillaTilt = require("vanilla-tilt");
    VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
      maxTilt: 6,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      speed: 500,
      transition: true,
    });
  }, []);
  return (
    <div className="gosaa_tm_section" id="tiers">
      <div className="gosaa_tm_tiers moving_effect"
      data-direction="y"
      data-reverse="yes">
        <div className="">
        <div className="p2e_inner">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text_center">
            </div>
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-12 text_center"></div>
            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 text_center">
              <img src="/images/p2e/p2e_table_3.png" className="p2e_img text_center in layer" data-depth="0.6" />
            </div>
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-12 text_center"></div>
          </div>
        </div>
      </div>
      </div>
      <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text_center p2emargin">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-xs-3 text_center"></div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6 text_center">
                <img src="/images/tiers/breeding.png" className="bredding_title in layer" data-depth="0.6" />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-xs-3 text_center"></div>
              </div>

            </div>
            <div className="col-xl-1 col-lg-1 col-md-3 col-sm-12"></div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text_left mobile_center">
            <img src="/images/tiers/text_breeding.png" className="in layer" data-depth="0.6" />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12"></div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 text_right">
              <img src="/images/tiers/breeding_char.png" className="in layer" data-depth="0.6" />
            </div>
            <div className="col-xl-1 col-lg-1 col-md-3 col-sm-12"></div>
          </div>
        </div>
        <div className="text_center">
          <img src="/images/tiers/how_does_breeding_works.png" className="in layer" data-depth="0.6" />
        </div>
        <div className="container">
          <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12"></div>
            <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
            <img src="/images/tiers/text_some_species.png" className="in layer" data-depth="0.6" />
            <br></br><br></br>
            <img src="/images/tiers/text_breeding_example_desc.png" className="in layer" data-depth="0.6" />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12"></div>
          </div>
        </div>

        <div className="container breedingmargin">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 text_right mobile_center wow fadeInRight"
            data-wow-duration="1s"
            data-wow-delay="0.2s">
            <img src="/images/tiers/organic_super_rare.png" className="width70 mobilewith100 in layer tilt-effect" data-depth="0.6" />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 text_center wow fadeInRight"
            data-wow-duration="1s"
            data-wow-delay="0.2s">
            <img src="/images/tiers/robot_spectacular.png" className="width70 mobilewith100 in layer tilt-effect" data-depth="0.6" />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 text_left mobile_center wow fadeInRight"
            data-wow-duration="1s"
            data-wow-delay="0.2s">
            <img src="/images/tiers/cyborg_lumies.png" className="width70 mobilewith100 in layer tilt-effect" data-depth="0.6" />
            </div>
          </div>
        </div>


        <div className="container p2emargin">
          <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12"></div>
            <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
            <img src="/images/tiers/text_cross_species.png" className="in layer" data-depth="0.6" />
            <br></br><br></br>
            <img src="/images/tiers/text_cross_species_desc.png" className="in layer" data-depth="0.6" />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12"></div>
          </div>
        </div>

        <div className="container breedingmargin">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 text_right mobile_center wow fadeInRight"
            data-wow-duration="1s"
            data-wow-delay="0.2s">
            <img src="/images/tiers/cyborg_super_rare.png" className="width70 mobilewith100 in layer tilt-effect" data-depth="0.6" />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 text_center wow fadeInRight"
            data-wow-duration="1s"
            data-wow-delay="0.2s">
            <img src="/images/tiers/cyborg_legendary.png" className="width70 mobilewith100 in layer tilt-effect" data-depth="0.6" />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 text_left mobile_center wow fadeInRight"
            data-wow-duration="1s"
            data-wow-delay="0.2s">
            <img src="/images/tiers/cyborg_lumies_2.png" className="width70 mobilewith100 in layer tilt-effect" data-depth="0.6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiers;
