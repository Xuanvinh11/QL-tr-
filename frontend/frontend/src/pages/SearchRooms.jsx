import React, { useEffect, useState } from "react";
import ApiServices from "../services";
import ProductCard from "../components/ProductCard";
import HomeSearch from "../components/HomeSearch";
import { Link, useLocation } from "react-router-dom";
import { useLoading } from "../contexts/LoadingProvider";

export default function SearchRooms() {
  const [rooms, setRooms] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      provinceCode: params.get("provinceCode") || "",
      districtCode: params.get("districtCode") || "",
      priceRange: params.get("priceRange") || "",
      area: params.get("area") || "",
      status: params.get("status") || "",
    };
  };

  const fetchRooms = async (queryParams) => {
    try {
      showLoading();
      const response = await ApiServices.getRooms(queryParams);
      setRooms(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    fetchRooms(queryParams);
  }, [location.search]);

  return (
    <>
      <HomeSearch />
      <div className='container py-4'>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to={"/"}>Trang chủ</Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Tìm phòng
            </li>
          </ol>
        </nav>

        <h2 className='mb-4 fw-bold'>Cho thuê phòng trọ, nhà nguyên căn, căn hộ, chung cư Hà Nội giá rẻ, mới nhất</h2>

        <div className='bg-white rounded p-4'>
          <h5 className='fw-semibold mb-3'>Tổng {rooms.length} kết quả</h5>
          {!rooms.length && <p className='text-muted mb-0'>Không tìm thấy kết quả phù hợp!</p>}
          {rooms.map((item) => (
            <div key={item.roomId} className='mb-3'>
              <ProductCard room={item} variant='large' />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
