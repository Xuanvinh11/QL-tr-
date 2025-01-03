import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuill } from "react-quilljs";
import { useLoading } from "../contexts/LoadingProvider";
import ApiServices from "../services";
import { HttpStatusCode } from "axios";

export default function FormMailModal({ email }) {
  const { quill, quillRef } = useQuill({ placeholder: "Nội dung" });
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const buttonRef = useRef();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim().length === 0) return toast.error("Nội dung không được để trống.");

    try {
      showLoading();

      const response = await ApiServices.sendMail({ recipientEmail: email, subject, body: content });

      if (response.status === HttpStatusCode.Ok) {
        toast.success(response.data.message);
        buttonRef.current.click();
      }
    } catch (error) {
      // toast.error(error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className='modal fade' id='mailModal' aria-hidden='true' tabIndex='-1'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={onSubmit}>
              <div className='form-floating mb-3'>
                <input type='text' className='form-control' id='email-input' value={email} placeholder='' disabled />
                <label htmlFor='email-input'>Email người nhận</label>
              </div>
              <div className='form-floating mb-3'>
                <input
                  type='text'
                  className='form-control'
                  id='subject-input'
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder=''
                  maxLength={255}
                  required
                />
                <label htmlFor='subject-input'>Chủ đề</label>
              </div>
              <div className='pb-5 mb-5'>
                <div style={{ width: "100%", height: 150 }}>
                  <div ref={quillRef} />
                </div>
              </div>
              <div className='d-grid mb-3'>
                <button type='submit' className='btn btn-info btn-lg text-white fw-bold'>
                  Gửi
                </button>
                <button hidden type='button' ref={buttonRef} data-bs-dismiss='modal'>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
