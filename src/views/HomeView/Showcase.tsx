import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Pagination, Navigation]);
const Showcase = () => {
  const props = {
    slidesPerView: 4,
    loop: true,
    pagination: false,
    autoplay: {
      delay: 500,
      disableOnInteraction: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 2
      },
      680: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      980: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    },
    navigation: {
      prevEl: ".prev_button",
      nextEl: ".next_button",
    },
  };

  const showIcons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  return (
    <div className="gosaa_tm_section p2emargin2" id="showcase">
      <div className="p2emargin showcase_bg show_case_padding_bottom">
        <div className="container">
          <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 text_center">
                <img src="/images/showcase/show_case.png" className="show_case_title in layer" data-depth="0.6" />
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-2"></div>
          </div>
        </div>
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="hidememobile col-xl-1 col-lg-1 col-md-1 col-sm-12">
            <div className="direct text_center">
              <a className="prev_button">
              <img src="/images/showcase/left_icon.png" />
              </a>
            </div>
            </div>
            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12">
            <Swiper {...props} className="owl-carousel">
              {showIcons.map(index => (
                <SwiperSlide className="item" key={index}>
                <img src={`/images/showcase/showcase_${index}.png`} className="show_case_img in layer" data-depth="0.6" />
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
            <div className="hidememobile col-xl-1 col-lg-1 col-md-1 col-sm-12">
            <div className="direct text_center">

              <a className="next_button">
              <img src="/images/showcase/right_icon.png" />
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
