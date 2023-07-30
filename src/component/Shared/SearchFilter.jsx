import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './search.css';

const SearchFilter = () => {
    const { products } = useSelector((state) => state.products);
    const [filter, setFilter] = useState("");

    return (
        <>
            <div class="search ">
                <span class="fa fa-search"></span>
                <input
                    type="text"
                    placeholder="search product"
                    className="input input-bordered input-sm "
                    onChange={(event) => { setFilter(event.target.value) }}
                />
            </div>
            <div>
                {
                    Array.isArray(products) && products.filter((searchValue) => {
                        if (setFilter === "") {
                            return searchValue;
                        }
                        else if (filter && searchValue.productName.toLowerCase().includes(filter.toLowerCase())) {
                            return searchValue;
                        }
                    })
                        .map((searchValue) => {
                            return (
                                <div className='card-compact bg-lime-500 shadow-xl rounded-sm mx-10 w-72' key={searchValue.id}>
                                    <div className='w-32 mt-10 mx-20'>
                                        <figure>
                                            <img
                                                src={searchValue.productImage} alt='No available...' />
                                        </figure>
                                    </div>

                                    <div className='card-body '>
                                        <div className='flex justify-between'>
                                            <h2 className='card-title'>{searchValue.productName}</h2>
                                            <h2 className='card-title'>${searchValue.productPrice}</h2>
                                        </div>
                                        <p>{searchValue.productDescription.slice(0, 60) + '..'}</p>
                                    </div>
                                    <button className='bg-lime-600 w-full p-2 text-white hover:bg-green-500'>Learn More...</button>
                                </div>
                            )
                        })
                }
            </div>
        </>
    );
};

export default SearchFilter;