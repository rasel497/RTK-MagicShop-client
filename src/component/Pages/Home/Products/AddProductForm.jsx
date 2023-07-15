import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


const AddProductForm = () => {
    const { register, reset, formState, formState: { errors }, handleSubmit } = useForm();
    const [addProduct, setAddProduct] = useState();

    // after form is submit successfull then reset all field
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                productName: '', productPrice: '', productImage: '', status: 'Select', productDescription: ''
            })
        }
    }, [reset, formState.isSubmitSuccessful]);

    const handleAddProduct = (data) => {
        const localuser = JSON.parse(localStorage.getItem('user'));
        data.userId = localuser[0].id
        axios.post(`http://localhost:5000/addProduct/`, data)
            .then(res => {
                if (res.data.message) {
                    setAddProduct(res.data.message)
                } else {
                    setAddProduct("Product successfully added")
                }
            })
            .catch(err => console.log(err))
    };
    return (
        <section className='flex justify-center mt-10'>
            <div className='bg-violet-950 rounded-md p-5'>
                <h2 className="text-2xl text-green-600 font-bold text-center">{addProduct}</h2>
                <h2 className="text-2xl text-white font-bold text-center">Add New Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-4 mt-5'>
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold text-white text-md">Product Name</span></label>
                            <input type="text" className="input input-bordered w-full" placeholder="Product name"
                                {...register("productName", { required: "Product Name is requred!" })}
                            />
                            {errors.productName && <p className='text-red-600'>{errors.productName?.message}</p>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label"><span className="label-text font-bold text-white text-md">Price</span></label>
                            <input type="number" className="input input-bordered w-full " placeholder="Product price"
                                {...register("productPrice", { required: "Price is requred!" })}
                            />
                            {errors.productPrice && <p className='text-red-600'>{errors.productPrice?.message}</p>}
                        </div>
                    </div>
                    <div className="form-control w-full ">
                        <label className="label"><span className="label-text font-bold text-white text-md">Product Photo URL</span></label>
                        <input type="text" className="input input-bordered w-full" placeholder="Photo Url"
                            {...register("productImage", { required: "Photo Url is requred!" })}
                        />
                        {errors.productImage && <p className='text-red-600'>{errors.productImage?.message}</p>}
                    </div>
                    <div className='flex'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label"><span className="label-text font-bold text-white text-md">Status of product?</span></label>
                            <select className="select select-info w-full max-w-xs" {...register("status")}>
                                <option selected>Select</option>
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
                        <textarea
                            {...register("productDescription", { required: "Product Description is required!" })}
                            className="textarea textarea-bordered h-24 w-full" placeholder="Write description...."
                        ></textarea>
                        {errors.productDescription && <p className='text-red-600'>{errors.productDescription?.message}</p>}
                    </div>
                    <input className='btn mt-4 items-center bg-sky-950' type="submit" value="Add Product" />
                </form >
            </div >
        </section>
    );
};

export default AddProductForm;