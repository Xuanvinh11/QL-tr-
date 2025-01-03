import React, { useRef, useState } from "react";
import Logo from "./Logo";
import toast from "react-hot-toast";
import ApiServices from "../services";
import { HttpStatusCode } from "axios";
import TokenUtils from "../utils/token";
import ProfileUtils from "../utils/profile";
import { useUser } from "../contexts/UserProvider";
import { useLoading } from "../contexts/LoadingProvider";

export default function LoginModal() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const buttonRef = useRef();
  const { setUser } = useUser();
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

    if (!formValue.email || !formValue.password) return toast.error("Vui lòng nhập đầy đủ thông tin.");

    try {
      showLoading();
      const response = await ApiServices.login(formValue);

      if (response.status === HttpStatusCode.Ok) {
        const { token, user } = response.data;

        TokenUtils.setToken(token);
        ProfileUtils.setProfile(user);
        setUser(user);
        toast.success("Đăng nhập thành công.");
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
      <div className='modal fade' id='loginModal' aria-hidden='true' tabIndex='-1'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <div className='text-center'>
                <Logo />
                <h5 className='mt-3 mb-5'>Chào mừng bạn đến với Trọ Mới</h5>
              </div>
              <form onSubmit={onSubmit}>
                <div className='form-floating mb-3'>
                  <input
                    type='email'
                    className='form-control'
                    id='email-input'
                    name='email'
                    value={formValue.email}
                    onChange={handleInputChange}
                    placeholder=''
                    maxLength={255}
                    required
                  />
                  <label htmlFor='email-input'>Email</label>
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
                    maxLength={255}
                    required
                  />
                  <label htmlFor='password-input'>Mật khẩu</label>
                </div>
                <div className='d-grid mb-3'>
                  <button type='submit' className='btn btn-info btn-lg text-white fw-bold'>
                    Đăng nhập
                  </button>
                  <button hidden type='button' ref={buttonRef} data-bs-dismiss='modal'>
                    Close
                  </button>
                </div>
                <div className='text-center'>Chưa có tài khoản? Đăng ký</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
