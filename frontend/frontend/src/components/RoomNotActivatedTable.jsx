import { HttpStatusCode } from "axios";
import { Check } from "lucide-react";
import React from "react";
import { useLoading } from "../contexts/LoadingProvider";
import toast from "react-hot-toast";
import ApiServices from "../services";

export default function RoomNotActivatedTable({ rooms, fetchRooms }) {
  const { showLoading, hideLoading } = useLoading();

  if (rooms.length === 0) {
    return (
      <div className='text-center pt-4'>
        <img src='https://tromoi.com/frontend/home/images/hostel_empty.png' width={240} alt='' />
        <p className='fw-bold mb-0'>Danh sách trống</p>
      </div>
    );
  }

  const handleApprove = async (roomId) => {
    try {
      showLoading();
      const response = await ApiServices.approveRoom(roomId);

      if (response.status === HttpStatusCode.Ok) {
        toast.success(response.data.message);
        fetchRooms();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <table className='table align-start'>
        <thead>
          <tr className='table-dark'>
            <th scope='col'>Tên nhà trọ</th>
            <th scope='col'>Tên chủ trọ</th>
            <th scope='col'>Địa chỉ</th>
            <th scope='col'>Diện tích</th>
            <th scope='col'>Trạng thái</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td style={{ maxWidth: "200px" }}>{room.name}</td>
              <td>{room.ownerName}</td>
              <td style={{ maxWidth: "200px" }}>{room.address + ", " + room.districtName + ", " + room.provinceName}</td>
              <td>{room.area}</td>
              <td>
                {room.isActive ? <span className='badge text-bg-success'>Đã duyệt</span> : <span className='badge text-bg-danger'>Chờ duyệt</span>}
              </td>
              <td>
                <button className='btn btn-warning shadow' onClick={() => handleApprove(room.roomId)}>
                  <Check />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
