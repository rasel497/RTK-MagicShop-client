import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setIsLogedIn, setIsLogedOut } from '../component/State/userAuthSlice';


const PrivateRoute = ({ children }) => {
    const { isLogedIn, isLoading } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        const currentUser = localStorage.getItem('user');
        if (isLoading) {
            if (currentUser !== null && currentUser.length > 0) {
                dispatch(setIsLogedIn());
            }
            else {
                dispatch(setIsLogedOut());
            }
        }
    }, [isLoading, isLogedIn, dispatch]);

    return isLoading ? <div>LOADING...</div> : isLogedIn ? children : <Navigate to="/login" />

    // It's alternative way but ekhon r kaj kore na
    // const ele = isLoading ? <div>LOADING...</div> : isLogedIn ? element : <Navigate to="/login" />
    // return <Route path={path} ele={ele} /> // path and element received from app.js PrivateRoute
};

export default PrivateRoute;