import { Send } from "lucide-react";
import React, { useState } from "react";
import FormMailModal from "./FormMailModal";

export default function CommentTable({ comments }) {
  const [recipientEmail, setRecipientEmail] = useState("");

  if (comments.length === 0) {
    return (
      <div className='text-center pt-4'>
        <img src='https://tromoi.com/frontend/home/images/hostel_empty.png' width={240} alt='' />
        <p className='fw-bold mb-0'>Bạn chưa nhận được đánh giá nào</p>
        <p className='text-muted'>Đăng trọ ngay để nhận được nhiều đánh giá hơn</p>
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
            <th scope='col'>Số điện thoại</th>
            <th scope='col'>Nội dung</th>
            <th scope='col'>Tên phòng trọ</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.commentId}>
              <td style={{ maxWidth: "200px" }}>{comment.fullName}</td>
              <td>{comment.email}</td>
              <td>{comment.phoneNumber}</td>
              <td style={{ maxWidth: "200px" }}>{comment.content}</td>
              <td style={{ maxWidth: "200px" }}>{comment.roomName}</td>
              <td>
                <button
                  className='btn btn-warning'
                  title='Trả lời'
                  onClick={() => setRecipientEmail(comment.email)}
                  data-bs-toggle='modal'
                  data-bs-target='#mailModal'>
                  <Send color='#fff' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FormMailModal email={recipientEmail} />
    </>
  );
}
