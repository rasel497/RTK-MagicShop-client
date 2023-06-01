import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../../../State/productsSlice';
import { setUsers } from '../../../State/userAuthSlice';

const MyProduct = () => {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector((state) => state.products);
    // const { users } = useSelector((state) => state.users);
    // console.log('allusers', users);

    // const ui = users?.find((u) => u.id)
    // console.log('uiiiK', ui);

    const localUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = localUser?.find(user => user.id);


    // const uid = products.filter((product) => product.userId === 2)
    // console.log('products', uid);


    // set users
    useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then((res) => {
                dispatch(setUsers(res.data))
            })
            .catch(err => console.log(err))
    }, []);

    // different users different product after add products
    useEffect(() => {
        if (isLoading) {
            axios.get(`http://localhost:5000/publishedProduct/${currentUserId.id}`)
                .then((res) => {
                    dispatch(setProducts(res.data));
                })
                .catch((err) => console.log(err));
        }
    }, [dispatch, isLoading]);



    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-5 mx-auto my-10'>
            <h3>ID: {currentUserId.id} and Email: {currentUserId.email}</h3>
            {
                Array.isArray(products) &&
                products.map((product) => (
                    <div className='card card-compact bg-orange-200 shadow-xl' key={product.id}>
                        <figure>
                            <img src={product.productImage} alt='No available...' />
                        </figure>
                        <div className='card-body'>
                            <div className='flex justify-between'>
                                <h2 className='card-title'>{product.productName}</h2>
                                <h2 className='card-title'>${product.productPrice}</h2>
                            </div>
                            <p>{product.productDescription.slice(0, 70) + '...'}</p>
                        </div>
                        <div className='flex justify-between p-2'>
                            <button className='btn btn-success text-white'>Add to cart</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
export default MyProduct;
