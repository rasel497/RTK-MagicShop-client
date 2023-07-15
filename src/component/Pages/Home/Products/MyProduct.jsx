import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, setProducts, setUpdateProduct } from '../../../State/productsSlice';
import { useForm } from 'react-hook-form';

const MyProduct = () => {
    const dispatch = useDispatch();
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const { products, isLoading, updateProduct } = useSelector((state) => state.products);
    const localUser = JSON.parse(localStorage.getItem('user'));
    const currentUserId = localUser?.find(user => user.id);
    const [productValues, setProductValues] = useState();

    // different users different product after create/add products
    useEffect(() => {
        if (isLoading) {
            axios.get(`http://localhost:5000/publishedProduct/${currentUserId.id}`)
                .then((res) => {
                    dispatch(setProducts(res.data));
                })
                .catch((err) => console.log(err));
        }
    }, [dispatch, isLoading]);

    // set selected update values show in modal input field
    useEffect(() => {
        setProductValues(updateProduct)
    }, [updateProduct]);


    // it's avoid set defaultvalue when we clik Edit button
    useEffect(() => {
        if (productValues) {
            console.log('KKPPP', productValues);
            reset({
                productName: productValues.productName,
                productPrice: productValues.productPrice,
                productImage: productValues.productImage,
                productDescription: productValues.productDescription,
                // status: productValues.active ? 'active' : 'inactive'
            })
        }
    }, [productValues, reset]);

    // click edit button for diiferent product id
    const handleEdit = (id) => {
        const update = products.find((product) => product.id === id);
        dispatch(setUpdateProduct(update));
    }

    // Update product
    const handleUpdateProduct = (data) => {
        // console.log('update data', data);
        axios.put(`http://localhost:5000/updateProduct/${productValues.id}`, data)
            .then((res) => {
                console.log(res.data)
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    // delete product from db list
    const handleDeleteProduct = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            axios.delete(`http://localhost:5000/deleteProduct/${id}`)
                .then((res) => {
                    console.log(res);
                    dispatch(deleteProduct({ id: id }))
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <section>
            <div className="overflow-x-auto flex justify-center mt-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) =>
                                <tr key={product}>

                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.productImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.productName}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.productDescription.slice(0, 30) + '...'}</td>
                                    <td>${product.productPrice}</td>
                                    <th>
                                        <div className='flex justify-between p-2'>
                                            <label onClick={() => handleEdit(product.id)} htmlFor="product-modal-1" className='btn btn-sm bg-green-600 mr-2' >Edit</label>
                                            <button onClick={() => handleDeleteProduct(product.id)} className='btn btn-sm bg-red-600'>Delete</button>
                                        </div>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-5 mx-auto my-10'>
                {
                    Array.isArray(products) &&
                    products.map((product) => (
                        <div className='card card-compact bg-orange-200 shadow-xl' key={product.id}>
                            <figure>
                                <img className='w-72' src={product.productImage} alt='No available...' />
                            </figure>
                            <div className='card-body'>
                                <div className='flex justify-between'>
                                    <h2 className='card-title'>{product.productName}</h2>
                                    <h2 className='card-title'>${product.productPrice}</h2>
                                </div>
                                <p>{product.productDescription.slice(0, 70) + '...'}</p>
                            </div>
                            <div className='flex justify-between p-2'>
                                <label onClick={() => handleEdit(product.id)} htmlFor="product-modal-1" className='btn btn-success text-white' >Edit</label>
                                <button onClick={() => handleDeleteProduct(product.id)} className='btn bg-red-600 text-white'>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div> */}
            <div div className='card-actions justify-between' >
                <input type="checkbox" id="product-modal-1" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative bg-blue-950">
                        <label htmlFor="product-modal-1" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold py-4 text-white">Update: <strong className='text-lime-500'>{productValues?.productName}</strong></h3>
                        <form onSubmit={handleSubmit(handleUpdateProduct)}>
                            <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5'>
                                <div className="form-control w-full">
                                    <label className="label"><span className="label-text font-bold text-white text-md">Product Name</span></label>
                                    <input type="text" className="input w-full input-bordered mb-2"
                                        {...register("productName", { required: "Product name is requred!" })}
                                    />
                                    {errors.productName && <p className='text-red-600'>{errors.productName?.message}</p>}
                                </div>
                                <div className="form-control w-full ">
                                    <label className="label"><span className="label-text font-bold text-white text-md">Price</span></label>
                                    <input type="number" className="input w-full input-bordered mb-2"
                                        {...register("productPrice", { required: "Price is requred!" })}
                                    />
                                </div>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label"><span className="label-text font-bold text-white text-md">Product Photo URL</span></label>
                                <input type="text" className="input w-full input-bordered mb-2"
                                    {...register("productImage", { required: "Phot URL is requred!" })}
                                />
                            </div>
                            <div className='flex'>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label"><span className="label-text font-bold text-white text-md">Status of product?</span></label>
                                    <select className="select select-info w-full max-w-xs" {...register("status")}>
                                        <option value="select">Select</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="form-control ml-2 w-full max-w-xs">
                                    <label className="label"><span className="label-text font-bold text-white text-md">Category?</span></label>
                                    <select className="select select-info w-full max-w-xs" {...register("category")}>
                                        <option selected>Select</option>
                                        <option>Smart Watch</option>
                                        <option>Mobile</option>
                                        <option>Earphone</option>
                                        <option>Laptop</option>
                                    </select>
                                </div>
                            </div>
                            <div className='form-control w-full'>
                                <label className="label"><span className="label-text font-bold text-white text-md">Product Description</span></label>
                                <textarea className="textarea textarea-bordered h-24 w-full"
                                    {...register("productDescription", { required: "Description is requred!" })} />
                            </div>
                            <input className='btn mt-4 items-center bg-sky-950' type="submit" value="Update" />
                        </form >
                    </div>
                </div>
            </div >

        </section >
    );
};
export default MyProduct;
