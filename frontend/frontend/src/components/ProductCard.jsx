import React from "react";
import { MapPin } from "lucide-react";
import StringUtils from "../utils/string";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ room, variant = "default" }) {
  const navigate = useNavigate();

  const handleNavigateToRoomDetail = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  if (variant === "default") {
    return (
      <div className='card border-0 w-100 position-relative' onClick={() => handleNavigateToRoomDetail(room.roomId)}>
        <span className='position-absolute top-0 start-0 badge bg-danger'>{room.isAvailable ? "Còn phòng" : "Hết phòng"}</span>
        <img src={room.image} className='card-img-top rounded' height={183} alt='' />
        <div className='card-body p-0'>
          <div className='card-title fw-semibold text-truncate mb-0'>{room.name}</div>
          <div className='card-text mb-1'>
            <small>Từ</small> <span className='text-danger fw-bold'>{StringUtils.formatPriceVND(room.price)}/tháng</span>
          </div>
          <h6 className='d-flex align-items-center gap-2 mb-2'>
            <span className='badge fw-medium text-bg-light'>Nhà trọ, phòng trọ</span>
            <span className='badge fw-medium text-bg-light'>{room.area}m²</span>
          </h6>
          <div className='card-text'>
            <small className='d-flex align-items-start gap-1'>
              <MapPin size={16} />
              <span>{room.address + ", " + room.districtName + ", " + room.provinceName}</span>
            </small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='d-flex gap-3' onClick={() => handleNavigateToRoomDetail(room.roomId)}>
      <div className='position-relative'>
        <img src={room.image} className='rounded' width={260} height={195} alt='' />
        <span className='position-absolute top-0 start-0 badge bg-danger'>{room.isAvailable ? "Còn phòng" : "Hết phòng"}</span>
      </div>
      <div className='d-flex flex-column gap-2'>
        <div className='fw-semibold text-truncate mb-0'>{room.name}</div>
        <div className='mb-1'>
          <small>Từ</small> <span className='text-danger fw-bold'>{StringUtils.formatPriceVND(room.price)}/tháng</span>
        </div>
        <h6 className='d-flex align-items-center gap-2 mb-2'>
          <span className='badge fw-medium text-bg-light'>Nhà trọ, phòng trọ</span>
          <span className='badge fw-medium text-bg-light'>{room.area}m²</span>
        </h6>
        <div>
          <small className='d-flex align-items-center gap-1'>
            <MapPin size={16} />
            <span>{room.address + ", " + room.districtName + ", " + room.provinceName}</span>
          </small>
        </div>
      </div>
    </div>
  );
}
