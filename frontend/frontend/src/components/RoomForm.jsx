import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import ApiServices from "../services";
import { Upload } from "lucide-react";
import { HttpStatusCode } from "axios";
import { useUser } from "../contexts/UserProvider";
import toast from "react-hot-toast";
import { useLoading } from "../contexts/LoadingProvider";

export default function RoomForm({ handleOnCloseForm, roomSelected }) {
  const { user } = useUser();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { quill, quillRef } = useQuill({
    placeholder: `
        Nội dung gợi ý:
        - Giới thiệu tổng quan khu trọ.
        - Giới thiệu chung các phòng.
        - Nội thất chung nhà trọ?
        - Giá điện, nước, phí quản lý?
        - Giới thiệu môi trường xung quanh?
        - Yêu cầu quy định khác?
      `
      .replace(/\s+/g, " ")
      .trim(),
  });
  const [formValue, setFormValue] = useState({
    name: "",
    area: "",
    price: "",
    closingTime: "",
    latitude: "",
    longitude: "",
    description: "",
    provinceCode: "",
    districtCode: "",
    address: "",
    ownerId: user.userId,
    image: null,
    allowPet: 0,
    hasAirConditioning: 0,
    numberOfBedrooms: 1,
    utilityCost: "",
  });
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (roomSelected) {
      setFormValue({
        name: roomSelected.name || "",
        area: roomSelected.area || "",
        price: roomSelected.price || "",
        closingTime: roomSelected.closingTime || "",
        latitude: roomSelected.latitude || "",
        longitude: roomSelected.longitude || "",
        description: roomSelected.description || "",
        provinceCode: roomSelected.provinceCode || "",
        districtCode: roomSelected.districtCode || "",
        address: roomSelected.address || "",
        ownerId: roomSelected.ownerId || user.userId,
        image: roomSelected.image || null,
        allowPet: roomSelected.allowPet || 0,
        hasAirConditioning: roomSelected.hasAirConditioning || 0,
        numberOfBedrooms: roomSelected.numberOfBedrooms || 1,
        utilityCost: roomSelected.utilityCost || "",
      });
    }

    if (roomSelected && quill && roomSelected.description) {
      quill.root.innerHTML = roomSelected.description;
    }

    if (roomSelected && roomSelected.provinceCode) {
      fetchDistricts(roomSelected.provinceCode);
    }
  }, [roomSelected, quill]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        showLoading();
        const response = await ApiServices.getProvinces();
        setProvinces(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        hideLoading();
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setFormValue((prevFormValue) => ({
          ...prevFormValue,
          description: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);

  const fetchDistricts = async (provinceCode) => {
    try {
      showLoading();
      const response = await ApiServices.getDistricts(provinceCode);
      setDistricts(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      hideLoading();
    }
  };

  const onChangeProvince = (e) => {
    const value = e.target.value;
    setDistricts([]);
    if (value) {
      setFormValue({ ...formValue, provinceCode: value, districtCode: "" });
      fetchDistricts(value);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValue((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
        toast.success("Hình ảnh đã được tải lên.");
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      showLoading();

      const payload = {
        ...formValue,
        price: Number(formValue.price),
        area: Number(formValue.area),
        latitude: Number(formValue.latitude),
        longitude: Number(formValue.longitude),
        utilityCost: Number(formValue.utilityCost),
        allowPet: Number(formValue.allowPet),
        hasAirConditioning: Number(formValue.hasAirConditioning),
        numberOfBedrooms: Number(formValue.numberOfBedrooms),
      };

      const response = roomSelected ? await ApiServices.updateRoom(payload, roomSelected.roomId) : await ApiServices.createRoom(payload);

      if (response.status === HttpStatusCode.Ok) {
        const { message } = response.data;
        toast.success(message);
        setTimeout(() => {
          handleOnCloseForm();
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h4 className='fw-bold text-primary mb-3'>Thông tin chung</h4>
        <div className='mb-3'>
          <label htmlFor='room-name' className='form-label fw-bold'>
            Tên Nhà trọ, phòng trọ
          </label>
          <input
            type='text'
            className='form-control'
            id='room-name'
            name='name'
            value={formValue.name}
            onChange={handleInputChange}
            placeholder='Ví dụ: Nhà trọ, phòng trọ tại 79 Lê Lợi, Quận 1'
            maxLength={255}
            required
          />
        </div>
        <div className='row mb-3'>
          <div className='col-6'>
            <div className='mb-3'>
              <label htmlFor='area' className='form-label fw-bold'>
                Diện tích
              </label>
              <input
                type='text'
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                className='form-control'
                id='area'
                name='area'
                value={formValue.area}
                onChange={handleInputChange}
                placeholder='Diện tích'
                required
              />
              <div className='form-text'>Đơn vị: m²</div>
            </div>
          </div>
          <div className='col-6'>
            <div className='mb-3'>
              <label htmlFor='price' className='form-label fw-bold'>
                Giá cho thuê
              </label>
              <input
                type='text'
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                className='form-control'
                id='price'
                name='price'
                value={formValue.price}
                onChange={handleInputChange}
                placeholder='Giá cho thuê'
                required
              />
            </div>
          </div>
          <div className='col-6'>
            <div className='mb-3'>
              <label htmlFor='latitude' className='form-label fw-bold'>
                Vĩ độ
              </label>
              <input
                type='text'
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                  if ((e.target.value.match(/\./g) || []).length > 1) {
                    e.target.value = e.target.value.substring(0, e.target.value.lastIndexOf("."));
                  }
                }}
                className='form-control'
                id='latitude'
                name='latitude'
                value={formValue.latitude}
                onChange={handleInputChange}
                placeholder='Vĩ độ'
                required
              />
              <div className='form-text'>Vui lòng nhập giá trị vĩ độ trùng khớp với vị trí hiện tại</div>
            </div>
          </div>
          <div className='col-6'>
            <div className='mb-3'>
              <label htmlFor='longitude' className='form-label fw-bold'>
                Kinh độ
              </label>
              <input
                type='text'
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                  if ((e.target.value.match(/\./g) || []).length > 1) {
                    e.target.value = e.target.value.substring(0, e.target.value.lastIndexOf("."));
                  }
                }}
                className='form-control'
                id='longitude'
                name='longitude'
                value={formValue.longitude}
                onChange={handleInputChange}
                placeholder='Kinh độ'
                required
              />
              <div className='form-text'>Vui lòng nhập giá trị kinh độ trùng khớp với vị trí hiện tại</div>
            </div>
          </div>
          <div className='col-6'>
            <div className='mb-3'>
              <label htmlFor='price' className='form-label fw-bold'>
                Giờ đóng cửa
              </label>
              <input
                type='time'
                className='form-control'
                id='closingTime'
                name='closingTime'
                value={formValue.closingTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className='col-6'>
            <div className='mb-3'>
              <label htmlFor='numberOfBedrooms' className='form-label fw-bold'>
                Số phòng ngủ
              </label>
              <input
                type='text'
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                className='form-control'
                id='numberOfBedrooms'
                name='numberOfBedrooms'
                value={formValue.numberOfBedrooms}
                onChange={handleInputChange}
                placeholder='Số phòng ngủ'
                required
              />
            </div>
          </div>
          <div className='col-6'>
            <div className='mb-3'>
              <label htmlFor='utilityCost' className='form-label fw-bold'>
                Chi phí tiện ích
              </label>
              <input
                type='text'
                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}
                className='form-control'
                id='utilityCost'
                name='utilityCost'
                value={formValue.utilityCost}
                onChange={handleInputChange}
                placeholder='Chi phí tiện ích'
                required
              />
            </div>
          </div>
          <div className='col-7'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                name='allowPet'
                checked={formValue.allowPet === 1}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    allowPet: e.target.checked ? 1 : 0,
                  })
                }
                id='allowPet'
              />
              <label className='form-check-label' htmlFor='allowPet'>
                Cho phép nuôi thú cưng
              </label>
            </div>
          </div>
          <div className='col-5'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                name='hasAirConditioning'
                checked={formValue.hasAirConditioning === 1}
                onChange={(e) =>
                  setFormValue({
                    ...formValue,
                    hasAirConditioning: e.target.checked ? 1 : 0,
                  })
                }
                id='hasAirConditioning'
              />
              <label className='form-check-label' htmlFor='hasAirConditioning'>
                Điều hòa
              </label>
            </div>
          </div>
        </div>

        <div className='mb-3 pb-5'>
          <label className='form-label fw-bold'>Nội dung mô tả</label>
          <div style={{ width: "100%", height: 200 }}>
            <div ref={quillRef} />
          </div>
        </div>

        <h4 className='fw-bold text-primary mb-3'>Địa điểm</h4>

        <div className='row mb-3'>
          <div className='col-6 mb-3'>
            <label className='form-label fw-bold'>Tỉnh/TP</label>
            <select className='form-select' value={formValue.provinceCode} onChange={onChangeProvince} required>
              <option value='' selected>
                Chọn Tỉnh/TP
              </option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col-6 mb-3'>
            <label className='form-label fw-bold'>Quận/Huyện</label>
            <select
              className='form-select'
              name='districtCode'
              value={formValue.districtCode}
              onChange={handleInputChange}
              disabled={!districts.length}>
              <option value='' selected>
                Chọn Quận/Huyện
              </option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className='col-12'>
            <label className='form-label fw-bold'>Địa chỉ</label>
            <input className='form-control' name='address' value={formValue.address} onChange={handleInputChange} placeholder='Địa chỉ'></input>
          </div>
        </div>

        <h4 className='fw-bold text-primary mb-3'>Hình ảnh tổng quan</h4>

        <label
          htmlFor='upload-file'
          className='d-flex flex-column gap-2 justify-content-center border-primary text-muted align-items-center mb-3'
          style={{ height: 150, border: "1px dashed" }}>
          <Upload size={40} strokeWidth={3} />
          <span className='fw-bold'>Chọn hình ảnh</span>
          <input type='file' id='upload-file' accept='image/*' onChange={handleImageUpload} hidden />
        </label>

        <button type='submit' className='btn btn-primary fw-bold'>
          Lưu thông tin
        </button>
      </form>
    </>
  );
}
