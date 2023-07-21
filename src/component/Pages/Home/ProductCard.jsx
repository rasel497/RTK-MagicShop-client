import React from 'react';
import { useDispatch } from 'react-redux';
import { setAddToCart } from '../../State/cartSlice';


const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    // addToCart product
    const addToCart = () => {
        console.log('addToCart', product);
        dispatch(setAddToCart(product));
    }
    return (
        <div className='card-compact bg-slate-300 shadow-xl rounded-sm mx-10 w-72' key={product.id}>
            <div className='w-32 mt-10 mx-20'>
                <figure>
                    <img
                        className='hover:scale-150 transition duration-500 cursor-pointer object-cover'
                        src={product.productImage} alt='No available...' />
                </figure>
            </div>

            <div className='card-body '>
                <div className='flex justify-between'>
                    <h2 className='card-title'>{product.productName}</h2>
                    <h2 className='card-title'>${product.productPrice}</h2>
                </div>
                <p>{product.productDescription.slice(0, 60) + '..'}</p>
            </div>
            <button onClick={() => addToCart(product)} className='bg-sky-500 w-full p-2 text-white hover:bg-sky-700'>Add to cart</button>
        </div>
    );
};
export default ProductCard;