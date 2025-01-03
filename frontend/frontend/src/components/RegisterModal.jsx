import React, { useRef, useState } from "react";
import ApiServices from "../services";
import { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import { useLoading } from "../contexts/LoadingProvider";

export default function RegisterModal() {
  const [formValue, setFormValue] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "STUDENT",
    confirmPassword: "",
  });
  const buttonRef = useRef();
  const { showLoading, hideLoading } = useLoading();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formValue.email || !formValue.fullName || !formValue.phoneNumber || !formValue.password || !formValue.confirmPassword) {
      return toast.error("Vui lòng nhập đầy đủ thông tin.");
    }

    try {
      showLoading();
      const response = await ApiServices.register(formValue);

      if (response.status === HttpStatusCode.Ok) {
        toast.success("Đăng ký tài khoản thành công.");
        buttonRef.current.click();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <div className='modal fade' id='registerModal' aria-hidden='true' tabIndex='-1'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div className='text-center'>
                <h5 className='mb-3'>Đăng ký tài khoản mới</h5>
              </div>
              <form onSubmit={onSubmit}>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='fullname-input'
                    name='fullName'
                    value={formValue.fullName}
                    onChange={handleInputChange}
                    placeholder=''
                    required
                  />
                  <label htmlFor='fullname-input'>Họ và tên</label>
                </div>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='email-input'
                    name='email'
                    value={formValue.email}
                    onChange={handleInputChange}
                    placeholder=''
                    required
                  />
                  <label htmlFor='email-input'>Email</label>
                </div>
                <div className='form-floating mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    id='phone-input'
                    name='phoneNumber'
                    value={formValue.phoneNumber}
                    onChange={handleInputChange}
                    placeholder=''
                    required
                  />
                  <label htmlFor='phone-input'>Số điện thoại</label>
                </div>
                <div className='form-floating mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    id='password-input'
                    name='password'
                    value={formValue.password}
                    onChange={handleInputChange}
                    placeholder=''
                    required
                  />
                  <label htmlFor='password-input'>Mật khẩu</label>
                </div>
                <div className='form-floating mb-3'>
                  <input
                    type='password'
                    className='form-control'
                    id='confirm-input'
                    name='confirmPassword'
                    value={formValue.confirmPassword}
                    onChange={handleInputChange}
                    placeholder=''
                    required
                  />
                  <label htmlFor='confirm-input'>Xác nhận Mật khẩu</label>
                </div>
                <div className='d-grid'>
                  <button type='submit' className='btn btn-info btn-lg text-white fw-bold'>
                    Đăng ký
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
    </>
  );
}
