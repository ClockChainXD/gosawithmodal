import { useEffect, useState } from "react";

const About = () => {
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
    <div className="gosaa_tm_section" id="about">
      <div className=""
      data-direction="y"
      data-reverse="yes">
        <div className="about_inner">
        <div className="text_center story_mobile">
        <img src="/images/story_bg_4.png" />
        </div>
        <div className="what_is_gosa moving_effect">
          <div className="container">
            <div className="row">
              <div className="hidememobile col-xl-4 col-lg-4 col-md-6 col-sm-12 text_center">
                <img src="/images/what_is_gosa/what_is_gosa_char.png" className="what_is_gosa_char in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 text_center">
              <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 text_center">
                <img src="/images/what_is_gosa/what_is_gosa.png" className="what_is_gosa_title marginTop30_ in layer" data-depth="0.6" />
              </div>
              <div className="hidememobile col-xl-6 col-lg-6 col-md-12 col-sm-12 text_center">
                <img src="/images/what_is_gosa/what_is_gosa_jelly_fish.png" className="what_is_gosa_jelly float_right in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text_center">
                <img src="/images/what_is_gosa/what_is_gosa_text.png" className="what_is_gosa_text in layer" data-depth="0.6" />
              </div>
              </div>
              </div>
            </div>
            <div className="row byq_margin_top">
              <div className="col-12 text_center">
                <img src="/images/what_is_gosa/text_by_acq.png" className="in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/byq_1.png" className="byq_img in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/byq_2.png" className="byq_img in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/byq_3.png" className="byq_img in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/byq_4.png" className="byq_img in layer" data-depth="0.6" />
              </div>
            </div>
          </div>
          <div className="byq_margin_top holder_div" style={{padding: '30px 0'}}>
              <div className="container">
              <div className="row">
              <div className="col-12 text_center" style={{marginBottom: '20px'}}>
                <img src="/images/what_is_gosa/text_gosa_holders.png" className="in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/holder_benefit_1.png" className="byq_img in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/holder_benefit_2.png" className="byq_img in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/holder_benefit_3.png" className="byq_img in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/holder_benefit_4.png" className="byq_img in layer" data-depth="0.6" />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/holder_benefit_5.png" className="byq_img in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/holder_benefit_6.png" className="byq_img in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/holder_benefit_7.png" className="byq_img in layer" data-depth="0.6" />
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-6 text_center">
                <img src="/images/what_is_gosa/holder_benefit_8.png" className="byq_img in layer" data-depth="0.6" />
              </div>
            </div>
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default About;
