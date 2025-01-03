import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import RoomDetailPage from "./pages/RoomDetailPage";
import SearchRooms from "./pages/SearchRooms";
import HostPage from "./pages/HostPage";
import { useLoading } from "./contexts/LoadingProvider";

function App() {
  const { loading } = useLoading();

  return (
    <>
      <Routes>
        <Route path='' element={<MainLayout />}>
          <Route path='' element={<HomePage />} />
          <Route path='room/:id' element={<RoomDetailPage />} />
          <Route path='search-rooms' element={<SearchRooms />} />
          <Route path='host' element={<HostPage />} />
        </Route>
      </Routes>
      <Toaster />
      {loading && (
        <div className='loading'>
          <div className='text-center position-absolute top-50 start-50 translate-middle' style={{ zIndex: "1000" }}>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
