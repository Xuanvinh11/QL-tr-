import React from "react";

export default function BoxSection() {
  return (
    <>
      <div className='container mb-4' style={{ marginTop: "60px" }}>
        <div className='row'>
          <div className='col-4'>
            <img
              src='https://tromoi.com/frontend/home/images/banners/banner_tang_30.webp'
              className='w-100 object-fit-cover rounded'
              height={138}
              alt=''
            />
          </div>
          <div className='col-4'>
            <img
              src='https://tromoi.com/frontend/home/images/banners/banner_dang_tro_nhanh.jpg'
              className='w-100 object-fit-cover rounded'
              height={138}
              alt=''
            />
          </div>
          <div className='col-4'>
            <img
              src='https://tromoi.com/frontend/home/images/banners/banner_tang_3_slot.webp'
              className='w-100 object-fit-cover rounded'
              height={138}
              alt=''
            />
          </div>
        </div>
      </div>
    </>
  );
}
