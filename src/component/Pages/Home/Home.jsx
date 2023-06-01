import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../State/productsSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products)

    useEffect(() => {
        axios.get('http://localhost:5000/myProducts')
            .then((res) => {
                dispatch(setProducts(res.data))
            })
            .catch(err => console.log(err))
    }, [dispatch]);

    return (
        <div>
            <h2 className='text-2xl text-center mt-5 underline'>All Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-5 mx-auto my-10'>
                {Array.isArray(products) &&
                    products?.map((product) => (
                        <div className='card card-compact bg-orange-200 shadow-xl' key={product.id}>
                            <figure>
                                <img src={product.productImage} alt='No available...' />
                            </figure>
                            <div className='card-body'>
                                <div className='flex justify-between'>
                                    <h2 className='card-title'>{product.productName}</h2>
                                    <h2 className='card-title'>${product.productPrice}</h2>
                                </div>
                                <p>{product.productDescription.slice(0, 70) + '..'}</p>
                                <div className='card-actions justify-center'>
                                    <button className='btn btn-success text-white'>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default Home;