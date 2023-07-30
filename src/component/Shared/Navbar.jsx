import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogedIn, setIsLogedOut } from '../State/userAuthSlice';
import { BsFillCartFill } from "react-icons/bs";
import SearchFilter from './SearchFilter';

const Navbar = () => {
    const { isLogedIn } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [userName, setUserName] = useState();

    useEffect(() => {
        const user = localStorage.getItem('user');
        // console.log('useEffect', JSON.parse(user));
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.length > 0 && parsedUser[0].username) {
                setUserName(parsedUser[0].username);
                dispatch(setIsLogedIn());
                // console.log(parsedUser[0].username, 'prase');
            }
        }
    }, []);

    // user Log Out
    const handleLogOut = () => {
        dispatch(setIsLogedOut());
        localStorage.removeItem('user');
        window.location.replace('/');
    }

    // user have or not
    const menuItems =
        <React.Fragment>
            {
                isLogedIn ?
                    <>
                        <li className='font-bold'><Link to='/myproduct'>My product</Link></li>
                        <li className='font-bold'><Link to='/addproduct'>Add product</Link></li>
                        <li className='text-red-400 font-bold'><button onClick={handleLogOut} to='/login'>SignOut/{userName}</button></li>
                    </>
                    :
                    <>
                        <li title='cart' className='bg-indigo-500 rounded-md'>
                            <Link to='/cart'><BsFillCartFill className='text-white' /></Link>
                        </li>
                        <li className='font-bold'><Link to='/login'>Login</Link></li>
                    </>
            }
        </React.Fragment>
    return (
        <section>
            <div className="navbar bg-base-100" style={{ backgroundColor: "#0088CC" }}>
                <div className="flex-1">
                    <Link to='/' className="btn btn-ghost normal-case text-2xl font-bold"><span className='text-white'>MagicShop</span></Link>
                </div>
                <div className="flex-none gap-2">
                    <div>
                        <SearchFilter />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                        </div>
                        <ul className="menu menu-horizontal p-0 text-white">
                            {menuItems}
                        </ul>
                    </div>

                    {/* <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://i.ibb.co/YhK840h/myPhoto1.png" alt='' />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            {menuItems}
                        </ul>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default Navbar;