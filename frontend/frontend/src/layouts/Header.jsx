import React from "react";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import RegisterModal from "../components/RegisterModal";
import LoginModal from "../components/LoginModal";
import User from "../components/User";

export default function Header() {
  return (
    <>
      <div className='container py-2'>
        <div className='d-flex align-items-center justify-content-between'>
          <Logo />
          <div className='d-flex align-items-center'>
            <ul className='d-flex align-items-center gap-4 mb-0'>
              <li>
                <Link className='text-dark fw-semibold' to='/'>
                  Nhà trọ, phòng trọ
                </Link>
              </li>
              <li>
                <Link className='text-dark fw-semibold' to='/'>
                  Nhà nguyên căn
                </Link>
              </li>
              <li>
                <Link className='text-dark fw-semibold' to='/'>
                  Căn hộ, chung cư
                </Link>
              </li>
            </ul>

            <User />
          </div>
        </div>
      </div>

      <RegisterModal />
      <LoginModal />
    </>
  );
}
