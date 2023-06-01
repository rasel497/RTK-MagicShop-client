import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './component/Pages/Login/Login';
import SignUp from './component/Pages/SignUp/SignUp';
import Navbar from './component/Shared/Navbar';
import UserProfile from './component/Pages/Profile/UserProfile';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Home from './component/Pages/Home/Home';
import AddProductForm from './component/Pages/Home/Products/AddProductForm';
import MyProduct from './component/Pages/Home/Products/MyProduct';

function App() {
  const { isLogedIn } = useSelector((state) => state.users);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={isLogedIn ? <Navigate to="/profile" /> : <Login />} />
        <Route path='/profile' element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        {/* <PrivateRoute path="/profile" element={<UserProfile />} /> */}
        <Route path='/addproduct' element={<AddProductForm />} />
        <Route path='/myproduct' element={<MyProduct />} />
      </Routes>
    </>
  );
}
export default App;
