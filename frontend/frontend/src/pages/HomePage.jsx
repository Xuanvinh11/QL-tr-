import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ApiServices from "../services";
import HomeSearch from "../components/HomeSearch";
import { toast } from "react-hot-toast";
import Banner from "../components/Banner";
import BoxSection from "../components/BoxSection";
import { useLoading } from "../contexts/LoadingProvider";

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchRooms = async () => {
      showLoading();
      try {
        const response = await ApiServices.getRooms();
        setRooms(response.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        hideLoading();
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <section className='position-relative' style={{ height: "400px" }}>
        <Banner />
        <div className='position-absolute top-100 start-50 translate-middle w-100 z-1'>
          <HomeSearch />
        </div>
      </section>

      <BoxSection />

      <div className='container'>
        <div className='bg-white rounded p-4'>
          <div className='row'>
            {rooms.map((item) => (
              <div key={item.roomId} className='col-3 mb-3'>
                <ProductCard room={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
