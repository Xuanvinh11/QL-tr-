import React from "react";
import { useUser } from "../contexts/UserProvider";
import Room from "../components/Room";
import Comment from "../components/Comment";
import Booking from "../components/Booking";
import { ROLE } from "../constants/role";
import RoomNotActivated from "../components/RoomNotActivated";

export default function HostPage() {
  const { user } = useUser();

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-4'>
          <div className='bg-white p-4 rounded'>
            <div className='d-flex align-items-center gap-2 mb-3'>
              <img src='https://tromoi.com/frontend/home/images/no-avt.png' className='rounded-circle' width={60} height={60} alt='' />
              <div>
                <p className='fw-bold mb-0'>{user?.fullName}</p>
                <p className='text-muted mb-0'>{user?.phoneNumber}</p>
              </div>
            </div>
            <ul className='nav nav-pills mb-3 flex-column' id='pills-tab' role='tablist'>
              {user && user.role === ROLE.ADMIN ? (
                <li className='nav-item w-100' role='presentation'>
                  <button
                    className='nav-link text-start fw-bold w-100 active'
                    id='pills-approve-tab'
                    data-bs-toggle='pill'
                    data-bs-target='#pills-approve'
                    type='button'
                    role='tab'
                    aria-controls='pills-approve'
                    aria-selected='true'>
                    Phê duyệt
                  </button>
                </li>
              ) : (
                <>
                  <li className='nav-item w-100' role='presentation'>
                    <button
                      className='nav-link text-start fw-bold w-100 active'
                      id='pills-room-tab'
                      data-bs-toggle='pill'
                      data-bs-target='#pills-room'
                      type='button'
                      role='tab'
                      aria-controls='pills-room'
                      aria-selected='true'>
                      Quản lý trọ
                    </button>
                  </li>
                  <li className='nav-item w-100' role='presentation'>
                    <button
                      className='nav-link text-start fw-bold w-100'
                      id='pills-comment-tab'
                      data-bs-toggle='pill'
                      data-bs-target='#pills-comment'
                      type='button'
                      role='tab'
                      aria-controls='pills-comment'
                      aria-selected='false'>
                      Quản lý đánh giá
                    </button>
                  </li>
                  <li className='nav-item w-100' role='presentation'>
                    <button
                      className='nav-link text-start fw-bold w-100'
                      id='pills-booking-tab'
                      data-bs-toggle='pill'
                      data-bs-target='#pills-booking'
                      type='button'
                      role='tab'
                      aria-controls='pills-booking'
                      aria-selected='false'>
                      Quản lý đặt phòng
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className='col-8'>
          <div className='bg-white p-4 rounded' style={{ minHeight: "80vh" }}>
            <div className='tab-content' id='pills-tabContent'>
              {user && user.role !== ROLE.ADMIN ? (
                <>
                  <div className='tab-pane fade show active' id='pills-room' role='tabpanel' aria-labelledby='pills-room-tab' tabIndex='0'>
                    <Room />
                  </div>
                  <div className='tab-pane fade' id='pills-comment' role='tabpanel' aria-labelledby='pills-comment-tab' tabIndex='0'>
                    <Comment />
                  </div>
                  <div className='tab-pane fade' id='pills-booking' role='tabpanel' aria-labelledby='pills-booking-tab' tabIndex='0'>
                    <Booking />
                  </div>
                </>
              ) : (
                <div className='tab-pane fade show active' id='pills-approve' role='tabpanel' aria-labelledby='pills-approve-tab' tabIndex='0'>
                  <RoomNotActivated />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
