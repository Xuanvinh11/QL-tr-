import React, { useEffect, useState } from "react";
import RoomForm from "./RoomForm";
import RoomTable from "./RoomTable";
import { useUser } from "../contexts/UserProvider";
import ApiServices from "../services";
import toast from "react-hot-toast";
import { useLoading } from "../contexts/LoadingProvider";

export default function Room() {
  const { user } = useUser();
  const [isShowForm, setShowForm] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const { showLoading, hideLoading } = useLoading();

  const fetchRooms = async () => {
    try {
      showLoading();
      const response = await ApiServices.getRoomsByUserId(user.userId);
      setRooms(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (user && user.userId) {
      fetchRooms();
    }
  }, [user]);

  const handleOnCloseForm = () => {
    fetchRooms();
    setShowForm(false);
  };

  const handleSelectRoom = (room) => {
    setRoom(room);
    setShowForm(true);
  };

  return (
    <>
      <div className='text-end border-bottom pb-3 mb-3'>
        <button
          className='btn btn-primary fw-bold shadow'
          onClick={() => {
            setShowForm(!isShowForm);
            setRoom(null);
          }}>
          {isShowForm ? "Hủy" : "Đăng Trọ Mới"}
        </button>
      </div>
      {!isShowForm ? <RoomTable rooms={rooms} setRoom={handleSelectRoom} /> : <RoomForm handleOnCloseForm={handleOnCloseForm} roomSelected={room} />}
    </>
  );
}
