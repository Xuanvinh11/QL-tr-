import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import ApiServices from "../services";
import { useLocation, useNavigate } from "react-router-dom";

export default function HomeSearch() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [searchParams, setSearchParams] = useState({
    provinceCode: "",
    districtCode: "",
    priceRange: "",
    area: "",
    status: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await ApiServices.getProvinces();
        setProvinces(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchProvinces();
  }, []);

  const fetchDistricts = async (provinceCode) => {
    try {
      const response = await ApiServices.getDistricts(provinceCode);
      setDistricts(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const params = {
      provinceCode: query.get("provinceCode") || "",
      districtCode: query.get("districtCode") || "",
      priceRange: query.get("priceRange") || "",
      area: query.get("area") || "",
      status: query.get("status") || "",
    };

    setSearchParams(params);

    if (params.provinceCode) {
      fetchDistricts(params.provinceCode);
    }
  }, [location.search]);

  const onChangeProvince = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => ({ ...prev, provinceCode: value, districtCode: "" }));
    setDistricts([]);
    if (value) fetchDistricts(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const queryString = new URLSearchParams(searchParams).toString();
    navigate(`/search-rooms?${queryString}`);
  };

  return (
    <div className='container p-3 bg-white rounded'>
      <div className='row'>
        <div className='col-2'>
          <select className='form-select' value={searchParams.provinceCode} onChange={onChangeProvince}>
            <option value='' selected>
              Tỉnh/TP
            </option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div className='col-2'>
          <select className='form-select' value={searchParams.districtCode} onChange={handleChange} name='districtCode' disabled={!districts.length}>
            <option value='' selected>
              Quận/Huyện
            </option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className='col-2'>
          <select className='form-select' value={searchParams.priceRange} onChange={handleChange} name='priceRange'>
            <option value='' selected>
              Khoảng giá
            </option>
            <option value='1'>Dưới 3 triệu</option>
            <option value='2'>Từ 3tr đến 5tr</option>
            <option value='3'>Từ 5tr đến 7tr</option>
            <option value='4'>Trên 7 triệu</option>
          </select>
        </div>
        <div className='col-2'>
          <select className='form-select' value={searchParams.area} onChange={handleChange} name='area'>
            <option value='' selected>
              Diện tích
            </option>
            <option value='1'>Dưới 20m²</option>
            <option value='2'>40m² - 60m²</option>
            <option value='3'>60m² - 80m²</option>
            <option value='4'>Trên 80m²</option>
          </select>
        </div>
        <div className='col-2'>
          <select className='form-select' value={searchParams.status} onChange={handleChange} name='status'>
            <option value='' selected>
              Trạng thái
            </option>
            <option value='1'>Còn phòng</option>
          </select>
        </div>
        <div className='col-2'>
          <button className='btn btn-dark d-flex align-items-center justify-content-center gap-1 w-100' onClick={handleSearch}>
            <Search size={16} />
            <span>Tìm kiếm</span>
          </button>
        </div>
      </div>
    </div>
  );
}
