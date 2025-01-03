import React, { useEffect, useState } from "react";
import CommentTable from "./CommentTable";
import { useLoading } from "../contexts/LoadingProvider";
import { useUser } from "../contexts/UserProvider";
import ApiServices from "../services";
import toast from "react-hot-toast";

export default function Comment() {
  const [comments, setComments] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const { user } = useUser();

  const fetchComments = async () => {
    try {
      showLoading();
      const response = await ApiServices.getCommentsByOwnerId(user.userId);
      setComments(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (user && user.userId) {
      fetchComments();
    }
  }, [user]);

  return (
    <>
      <CommentTable comments={comments} />
    </>
  );
}
