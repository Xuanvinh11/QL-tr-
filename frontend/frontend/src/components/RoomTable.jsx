import { SquarePen } from "lucide-react";
import React from "react";

export default function RoomTable({ rooms, setRoom }) {
  if (rooms.length === 0) {
    return (
      <div className='text-center pt-4'>
        <img src='https://tromoi.com/frontend/home/images/hostel_empty.png' width={240} alt='' />
        <p className='fw-bold mb-0'>Bạn chưa đăng tin trọ nào</p>
        <p className='text-muted'>Đăng trọ ngay để tiếp cận nhiều khách hàng tiềm năng</p>
      </div>
    );
  }

  return (
    <>
      <table className='table align-start'>
        <thead>
          <tr className='table-dark'>
            <th scope='col'>Tên nhà trọ</th>
            <th scope='col'>Địa chỉ</th>
            <th scope='col'>Giờ đóng cửa</th>
            <th scope='col'>Diện tích</th>
            <th scope='col'>Trạng thái</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td style={{ maxWidth: "200px" }}>{room.name}</td>
              <td style={{ maxWidth: "200px" }}>{room.address + ", " + room.districtName + ", " + room.provinceName}</td>
              <td>{room.closingTime}</td>
              <td>{room.area}</td>
              <td>
                {room.isActive ? <span className='badge text-bg-success'>Đã duyệt</span> : <span className='badge text-bg-danger'>Chờ duyệt</span>}
              </td>
              <td>
                <button className='btn btn-warning shadow' onClick={() => setRoom(room)}>
                  <SquarePen />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
