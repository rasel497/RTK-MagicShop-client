import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReviewIteam from './ReviewIteam/ReviewIteam';

const Cart = () => {

    const { cartItemX } = useSelector((state) => state.cart);
    // console.log('cartUU', cartItemX);

    const cartItem = JSON.parse(localStorage.getItem('cartItems'))
    const [cart, setCart] = useState();

    useEffect(() => {
        if (cart) {
            setCart(cart)
        }
    }, [cart]);

    // useEffect(() => {
    //     if (cartItem && cartItem.length > 0) {
    //         dispatch(setAddToCart(cartItem));
    //     }
    // }, [cartItem, dispatch]);

    return (
        <div>
            {
                cartItem ?
                    cartItem.map((product) => (
                        <ReviewIteam product={product} />))
                    :
                    <div className=' items-center'>
                        <p>No items in the shopping cart.</p>
                        <p>Please click to continue <Link to='/' className='text-green-500 font-semibold'>Shopping..</Link></p>
                    </div>
            }
        </div>
    );
};

export default Cart;
