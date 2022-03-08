import { useEffect, useState } from "react";

const RoadMap = () => {
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
    <div className="gosaa_tm_section" id="roadmap">
        <div className="p2emargin">
          <div className="row moving_effect"
          data-direction="y"
          data-reverse="yes">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text_center">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-0 text_center"></div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 text_center">
                <img src="/images/roadmap/road_map.png" className="what_is_gosa_title in layer" data-depth="1.6" />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-0 text_center"></div>
              </div>
            </div>

            <div className="container">
              <div className="road_map_margin roadmap_bg road_map_padding_bottom">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 text_left mobile_center wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay="0.2s">
                  <img src="/images/roadmap/road_map1.png" className="tilt-effect" />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-2 col-sm-12"></div>
              </div>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-2 col-sm-12"></div>
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 text_right mobile_center wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay="0.2s">
                  <img src="/images/roadmap/road_map2.png" className="tilt-effect" data-depth="1.6" />
                </div>
              </div>

              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 text_left mobile_center wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay="0.2s">
                  <img src="/images/roadmap/road_map3.png" className="tilt-effect" data-depth="0.6" />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-2 col-sm-12"></div>
              </div>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-2 col-sm-12"></div>
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 text_right mobile_center wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay="0.2s">
                  <img src="/images/roadmap/road_map4.png" className="tilt-effect" data-depth="0.6" />
                </div>
              </div>

              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 text_left mobile_center wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay="0.2s">
                  <img src="/images/roadmap/road_map5.png" className="tilt-effect" data-depth="0.6" />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-2 col-sm-12"></div>
              </div>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-2 col-sm-12"></div>
                <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12 text_right mobile_center wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay="0.2s">
                  <img src="/images/roadmap/road_map6.png" className="tilt-effect" data-depth="0.6" />
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default RoadMap;
