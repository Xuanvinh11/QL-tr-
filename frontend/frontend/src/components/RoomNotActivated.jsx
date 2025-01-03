import React, { useEffect, useState } from "react";
import RoomNotActivatedTable from "./RoomNotActivatedTable";
import { useLoading } from "../contexts/LoadingProvider";
import ApiServices from "../services";
import toast from "react-hot-toast";
import { useUser } from "../contexts/UserProvider";

export default function RoomNotActivated() {
  const { user } = useUser();
  const [rooms, setRooms] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  const fetchRooms = async () => {
    try {
      showLoading();
      const response = await ApiServices.getRoomsNotActivated();
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

  return (
    <>
      <RoomNotActivatedTable rooms={rooms} fetchRooms={fetchRooms} />
    </>
  );
}
