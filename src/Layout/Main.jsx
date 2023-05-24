import React from 'react';
import Navbar from '../component/Shared/Navbar';
import { Outlet } from 'react-router-dom';
const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;