import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../State/productsSlice';
import ProductCard from './ProductCard';
import Hero from './Banner/Hero';

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        axios.get('http://localhost:5000/myProducts')
            .then((res) => {
                dispatch(setProducts(res.data))
            })
            .catch(err => console.log(err))
    }, [dispatch]);
    return (
        <>
            <Hero />
            <div className='mx-0'>
                <div className='flex justify-center mt-5'>
                    <select className='p-1 px-5 rounded text-white bg-slate-500'>
                        <option selected>All Category</option>
                        <option>Smart Watch</option>
                        <option>Mobile</option>
                        <option>Earphone</option>
                        <option>Laptop</option>
                    </select>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
                    {Array.isArray(products) &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
                <div className="join flex justify-center">
                    <button className="join-item btn">1</button>
                    <button className="join-item btn">2</button>
                    <button className="join-item btn btn-disabled">...</button>
                    <button className="join-item btn">9</button>
                    <button className="join-item btn">10</button>
                </div>
            </div>
        </>

    );
};
export default Home;
// {
//     Array.isArray(products) &&
//     products?.map((product) => (
//         <div className='card card-compact bg-orange-200 shadow-xl mx-10' key={product.id}>
//             <figure>
//                 <img src={product.productImage} alt='No available...' />
//             </figure>
//             <div className='card-body'>
//                 <div className='flex justify-between'>
//                     <h2 className='card-title'>{product.productName}</h2>
//                     <h2 className='card-title'>${product.productPrice}</h2>
//                 </div>
//                 <p>{product.productDescription.slice(0, 70) + '..'}</p>
//                 <div className='card-actions justify-center'>
//                     <button onClick={() => addToCart} className='btn btn-success text-white'>Add to cart</button>
//                 </div>
//             </div>
//         </div>
//     ))
// } 