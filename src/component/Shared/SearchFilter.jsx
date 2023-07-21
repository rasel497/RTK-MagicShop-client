import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SearchFilter = () => {
    const { products } = useSelector((state) => state.products);
    const [filter, setFilter] = useState("");

    return (
        <div>
            <div className="form-control">
                <label className="input-group input-group-sm">
                    <input
                        type="text"
                        placeholder="search product"
                        className="input input-bordered input-sm"
                        onChange={(event) => { setFilter(event.target.value) }}
                    />
                    <span><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></span>
                </label>
            </div>
            <div>
                {
                    products.filter((searchValue) => {
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
        </div>
    );
};

export default SearchFilter;