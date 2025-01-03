import React from "react";
import { LogIn, Send, UserPlus, UserRound } from "lucide-react";
import ProfileUtils from "../utils/profile";
import TokenUtils from "../utils/token";
import { useUser } from "../contexts/UserProvider";
import { Link, useNavigate } from "react-router-dom";

export default function User() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    ProfileUtils.removeProfile();
    TokenUtils.removeToken();
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {!user ? (
        <div className='d-flex align-items-center ms-4'>
          <div className='border-end pe-3 me-3'>
            <button
              className='btn btn-link p-0 text-decoration-none text-primary fw-semibold d-flex align-items-center gap-2'
              data-bs-toggle='modal'
              data-bs-target='#loginModal'>
              <LogIn size={20} />
              <span>Đăng nhập</span>
            </button>
          </div>
          <div>
            <button
              className='btn btn-link p-0 text-decoration-none text-primary fw-semibold d-flex align-items-center gap-2'
              data-bs-toggle='modal'
              data-bs-target='#registerModal'>
              <UserPlus size={20} />
              <span>Đăng ký</span>
            </button>
          </div>
          <button
            className='btn btn-info ms-3 text-white fw-bold d-flex align-items-center gap-2'
            data-bs-toggle='modal'
            data-bs-target='#loginModal'>
            <Send />
            Đăng Trọ ngay
          </button>
        </div>
      ) : (
        <div className='dropdown ms-4'>
          <button
            className='btn btn-primary dropdown-toggle d-flex align-items-center gap-1 px-3'
            type='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'>
            <UserRound size={16} strokeWidth={3} />
            {user.fullName}
          </button>
          <ul className='dropdown-menu'>
            <li>
              <Link className='dropdown-item' to={"/host"}>
                Dành cho chủ trọ
              </Link>
            </li>
            <li>
              <a className='dropdown-item' href='javascript:void(0)' onClick={handleLogout}>
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
