import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../sass/home/_bigbanner.scss";
// import bigBannerImg from "../../assets/images/home/bigBanner.png";

import { hoData } from "./mockData";
import { Link } from "react-router-dom";
const Slider = React.lazy(() => import("./subComponent/Slider"));
// mock data
const dataS = hoData;
const BigBanner = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataS);
  }, [data]);
  // slider config
  const settings = {
    navArr: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
  };
  // const history =useHistory()
  // const pushToPhone = ()=>{
  //   return history.
  // }
  return (
    <div className="bigBannerWrap">
      <div
        className="bigBanner__img"
        style={{
          cursor: "pointer",
        }}
      >
        <Link to="/phone">
          <LazyLoadImage
            src={
              "https://cdn.tgdd.vn/2022/12/banner/Banner-Big-Desk-min-1920x450.webp"
            }
          />
        </Link>
      </div>
      <div className="bigBanner__slider">
        <Slider data={data} settings={settings} />
      </div>
    </div>
  );
};

export default BigBanner;
