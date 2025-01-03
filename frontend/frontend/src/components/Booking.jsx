import React, { useEffect, useState } from "react";
import CommentTable from "./CommentTable";
import { useLoading } from "../contexts/LoadingProvider";
import { useUser } from "../contexts/UserProvider";
import ApiServices from "../services";
import toast from "react-hot-toast";
import BookingTable from "./BookingTable";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const { user } = useUser();

  const fetchBookings = async () => {
    try {
      showLoading();
      const response = await ApiServices.getBookingsByOwnerId(user.userId);
      setBookings(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (user && user.userId) {
      fetchBookings();
    }
  }, [user]);

  return (
    <>
      <BookingTable bookings={bookings} />
    </>
  );
}
