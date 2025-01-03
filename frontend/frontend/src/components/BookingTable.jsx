import React from "react";
import { format } from "date-fns";

export default function BookingTable({ bookings }) {
  if (bookings.length === 0) {
    return (
      <div className='text-center pt-4'>
        <img src='https://tromoi.com/frontend/home/images/hostel_empty.png' width={240} alt='' />
        <p className='fw-bold mb-0'>Bạn chưa nhận được lượt đặt phòng nào</p>
        <p className='text-muted'>Đăng trọ ngay để nhận được nhiều lượt đặt phòng hơn</p>
      </div>
    );
  }

  return (
    <>
      <table className='table align-start'>
        <thead>
          <tr className='table-dark'>
            <th scope='col'>Họ và tên</th>
            <th scope='col'>Email</th>
            <th scope='col'>Tên phòng trọ</th>
            <th scope='col'>Ngày đặt</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId}>
              <td>{booking.customerName}</td>
              <td>{booking.customerEmail}</td>
              <td style={{ maxWidth: "200px" }}>{booking.roomName}</td>
              <td>{format(booking.bookingDate, "dd/MM/yyyy HH:mm")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
