import React from "react";
import BannerImage from "../assets/banner.jpg";

export default function Banner() {
  return (
    <>
      <div className='container position-absolute top-50 start-50 translate-middle z-1'>
        <h1 className='text-white text-uppercase lh-base mb-3' style={{ fontWeight: "800" }}>
          Tìm nhanh, kiếm dễ
          <br />
          Trọ Mới toàn quốc
        </h1>
        <p className='text-white' style={{ maxWidth: "470px" }}>
          Trang thông tin và cho thuê phòng trọ nhanh chóng, hiệu quả với hơn 500 tin đăng mới và 30.000 lượt xem mỗi ngày
        </p>
      </div>
      <img src={BannerImage} className='position-absolute w-100 h-100 top-0 start-0 z-0' alt='' />
    </>
  );
}
