import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Pages/Login/Login';
import SignUp from './component/Pages/SignUp/SignUp';
import Navbar from './component/Shared/Navbar';
import UserProfile from './component/Pages/Profile/UserProfile';
import PrivateRoute from './Routes/PrivateRouter/PrivateRoute';
import router from './Routes/Routes/Routes';


function App() {
  const { isLogedIn } = useSelector((state) => state.users);

  return (
    <>
      {/* <RouterProvider router={router}></RouterProvider> */}
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={isLogedIn ? <Navigate to="/profile" /> : <Login />} />
        <Route path='/profile' element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        {/* <Route path="/profile" element={isLoading ? <>Loading...</> : isLogedIn ? <UserProfile /> : <Navigate to="/login" />} /> */}
      </Routes>
    </>
  );
}
export default App;
