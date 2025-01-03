import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import ApiServices from "../services";
import { Calendar, CircleCheckBig, CircleDollarSign, Clock, House, MapPin, Phone, Ruler, UserRound } from "lucide-react";
import StringUtils from "../utils/string";
import { format } from "date-fns";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useUser } from "../contexts/UserProvider";
import { HttpStatusCode } from "axios";
import { useLoading } from "../contexts/LoadingProvider";

export default function RoomDetailPage() {
  const { user } = useUser();
  const { id: roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [comments, setComments] = useState([]);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [comment, setComment] = useState("");
  const { showLoading, hideLoading } = useLoading();

  const fetchRoom = async () => {
    try {
      showLoading();
      const response = await ApiServices.getRoomById(roomId);
      setRoom(response.data);
      setPosition({ lat: response.data.latitude, lng: response.data.longitude });
    } catch (error) {
      toast.error("Lỗi khi tải thông tin phòng.");
    } finally {
      hideLoading();
    }
  };

  const fetchComments = async () => {
    try {
      showLoading();
      const response = await ApiServices.getComments(roomId, user.userId);
      setComments(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải thông tin bình luận.");
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    fetchRoom();

    if (user && user.userId) {
      fetchComments();
    }
  }, [roomId, user]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Vui lòng đăng nhập để thực hiện hành động này,");
      return;
    }

    try {
      showLoading();
      const response = await ApiServices.addComment({ roomId, userId: user.userId, content: comment });

      if (response.status === HttpStatusCode.Ok) {
        fetchComments();
        setComment("");
        toast.success(response.data.message);
        const bodyMail = `
          <p>Tên khách hàng: ${user.fullName}</p>
          <p>Email: ${user.email}</p>
          <p>Số điện thoại: ${user.phoneNumber}</p>
          <p>Nội dung: ${comment}</p>
        `;
        await ApiServices.sendMail({ recipientEmail: room.ownerEmail, subject: "Bạn vừa nhận được một bình luận mới", body: bodyMail });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  const handleBookRoom = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thực hiện hành động này,");
      return;
    }

    try {
      showLoading();
      const response = await ApiServices.bookRoom({ roomId, userId: user.userId });

      if (response.status === HttpStatusCode.Ok) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className='container py-4'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to={"/"}>Trang chủ</Link>
          </li>
          <li className='breadcrumb-item active'>Nhà trọ, phòng trọ</li>
          <li className='breadcrumb-item active' aria-current='page'>
            {room?.name}
          </li>
        </ol>
      </nav>

      <div className='bg-white rounded p-4'>
        <h4 className='fw-semibold mb-2'>{room?.name}</h4>
        <div className='d-flex align-items-center gap-1 mb-3'>
          <MapPin size={16} />
          <span>{room?.address + ", " + room?.districtName + ", " + room?.provinceName}</span>
        </div>
        <div className='mb-3'>
          <img src={room?.image} className='w-100 object-fit-cover rounded' alt='' style={{ height: "600px" }} />
        </div>
        <div className='d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom'>
          <div>
            <span className='text-muted'>Giá chỉ từ</span>
            <h3 className='fw-bold text-danger'>{StringUtils.formatPriceVND(room?.price)}/tháng</h3>
          </div>
          <div className='d-flex gap-2'>
            <button className='btn btn-success fw-semibold' onClick={handleBookRoom}>
              Đặt phòng
            </button>
            <a href={"tel:" + room?.ownerPhone} className='btn btn-info text-white fw-bold d-flex align-items-center gap-1'>
              <Phone />
              <span>Liên hệ chủ trọ</span>
            </a>
          </div>
        </div>
        <div className='row mb-3 border-bottom'>
          <div className='col-3 mb-4'>
            <div className='d-flex align-items-center gap-2 text-dark'>
              <House strokeWidth={3} />
              <span className='fw-semibold'>Nhà trọ, phòng trọ - Tự quản</span>
            </div>
          </div>
          <div className='col-3 mb-4'>
            <div className='d-flex align-items-center gap-2 text-dark'>
              <CircleDollarSign strokeWidth={3} />
              <span className='fw-semibold'>Giá chỉ từ {StringUtils.formatPriceVND(room?.price)}/tháng</span>
            </div>
          </div>
          <div className='col-3 mb-4'>
            <div className='d-flex align-items-center gap-2 text-dark'>
              <Ruler strokeWidth={3} />
              <span className='fw-semibold'>Khoảng {room?.area}m²</span>
            </div>
          </div>
          <div className='col-3 mb-4'>
            <div className='d-flex align-items-center gap-2 text-dark'>
              <UserRound strokeWidth={3} />
              <span className='fw-semibold'>Chủ trọ: {room?.ownerName}</span>
            </div>
          </div>
          <div className='col-3 mb-3'>
            <div className='d-flex align-items-center gap-2 text-dark'>
              <Phone strokeWidth={3} />
              <span className='fw-semibold'>SĐT: {room?.ownerPhone}</span>
            </div>
          </div>
          <div className='col-3 mb-3'>
            <div className='d-flex align-items-center gap-2 text-dark'>
              <Calendar strokeWidth={3} />
              <span className='fw-semibold'>Ngày đăng: {room?.createdAt && format(room?.createdAt, "dd/MM/yyyy")}</span>
            </div>
          </div>
          <div className='col-3 mb-3'>
            <div className='d-flex align-items-center gap-2 text-dark'>
              <Clock strokeWidth={3} />
              <span className='fw-semibold'>Giờ đóng cửa: {room?.closingTime}</span>
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <h5>Giới thiệu</h5>
          <div dangerouslySetInnerHTML={{ __html: room?.description }}></div>
        </div>
        <div className='mb-3'>
          <h5>Tiện ích</h5>
          <div className='row'>
            {room?.allowPet && (
              <div className='col-3'>
                <div className='d-flex align-items-center gap-2'>
                  <CircleCheckBig size={16} color='#0d6efd' strokeWidth={3} />
                  <span>Cho phép nuôi thú cưng</span>
                </div>
              </div>
            )}
            {room?.hasAirConditioning && (
              <div className='col-3'>
                <div className='d-flex align-items-center gap-2'>
                  <CircleCheckBig size={16} color='#0d6efd' strokeWidth={3} />
                  <span>Có điều hòa</span>
                </div>
              </div>
            )}
            <div className='col-3'>
              <div className='d-flex align-items-center gap-2'>
                <CircleCheckBig size={16} color='#0d6efd' strokeWidth={3} />
                <span>Số phòng ngủ: {room?.numberOfBedrooms}</span>
              </div>
            </div>
            <div className='col-3'>
              <div className='d-flex align-items-center gap-2'>
                <CircleCheckBig size={16} color='#0d6efd' strokeWidth={3} />
                <span>Chi phí tiện ích: {StringUtils.formatPriceVND(room?.utilityCost)}/tháng</span>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <h5>Đường đi</h5>
          {position.lat && position.lng && (
            <MapContainer center={[position.lat, position.lng]} zoom={50} scrollWheelZoom={false} style={{ height: "500px" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={[position.lat, position.lng]}>
                <Popup>{room?.name}</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
        <h4 className='fw-semibold mb-2'>Nếu bạn có nhu cầu thuê phòng hãy để lại bình luận bên dưới</h4>
        <form onSubmit={handleAddComment} className='mb-5'>
          <div className='mb-3'>
            <textarea
              className='form-control'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder='Nhập nội dung...'
              style={{ resize: "none" }}
              required></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            Gửi
          </button>
        </form>
        <h4 className='fw-semibold mb-3'>Bình luận</h4>
        <ul className='m-0 p-0'>
          {comments.map((comment) => (
            <li className='mb-4' key={comment.commentId}>
              <div className='d-flex align-items-center gap-2 mb-3'>
                <img src='https://tromoi.com/frontend/home/images/no-avt.png' className='rounded-circle' width={45} height={45} alt='' />
                <div>
                  <div className='fw-semibold mb-0'>
                    {comment?.fullName} - {comment?.email} | {comment?.createdAt && format(comment?.createdAt, "dd/MM/yyyy HH:mm")}
                  </div>
                  <div className='text-muted'>{comment?.content}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
