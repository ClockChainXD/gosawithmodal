import { useEffect, useState } from "react";
import { parallax } from "../../utils/utilits";

const Home = () => {
  const [text, setText] = useState(1);
  useEffect(() => {
    parallax();
    const interval = setInterval(() => {
      setText(text < 3 ? text + 1 : 1);
    }, 5000);
    return () => clearInterval(interval);
  });
  return (
    <div className="gosaa_tm_section" id="home">
      <div className="gosaa_tm_hero">
        <div className="hero_margintop">
          <div className="hero_inner parallax">
            <div className="container">
                <div className="row">
                  <div className="col-xl-2 col-lg-2 col-md-2 col-2 text_center">
                    <img src="images/home/logo_left.png" className="in layer" data-depth="0.14" />
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-8 text_center">
                    <img src="images/home/logo.png" alt="image" className="layer" data-depth="0.1" />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 col-2 text_center">
                    <img src="images/home/logo_right.png" className="in layer" data-depth="0.14" />
                  </div>
                </div>
                <div className="marginTop370">
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-2">
                    <img src="images/home/logo_sub_char_1.png" className="in layer" data-depth="0.5" />
                  </div>
                  <div className="col-4">
                    <img src="images/home/logo_sub_char_2.png" alt="image" className="layer" data-depth="0.9" />
                  </div>
                  <div className="col-2">
                    <img src="images/home/logo_sub_char_3.png" className="in layer" data-depth="0.6" />
                  </div>
                  <div className="col-2"></div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
