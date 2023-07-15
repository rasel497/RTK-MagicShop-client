import React from 'react';
import './ReviewIteam.css';
import { RxCrossCircled } from 'react-icons/rx';

const ReviewIteam = ({ product, id }) => {

    const removeItemFromLocalStorage = () => {
        // Get the current items from localStorage
        const storedItems = localStorage.removeItem("cartItems");

        if (storedItems) {
            // Parse the stored items from JSON format
            const items = JSON.parse(storedItems);

            // Find the index of the item to remove
            const index = items.findIndex(item => item.id === id);

            if (index !== -1) {
                // Remove the item from the array
                items.splice(index, 1);

                // Convert the modified items back to JSON format
                const updatedItems = JSON.stringify(items);

                // Store the updated items back into localStorage
                localStorage.setItem("cartItems", updatedItems);
            }
        }
    }
    return (
        <div className='review-item'>
            <div>
                <figure><img src={product.productImage} className='w-20 h-15' alt="No available" /></figure>
            </div>
            <div className="review-details-container">
                <div className="review-details">
                    <h2 className="card-title">{product.productName}</h2>
                    <p>Price: ${product.productPrice}</p>
                    <p>Quantity: {product.cartQuantity}</p>
                </div>
                <div className="delete-container">
                    <button onClick={removeItemFromLocalStorage} className='delete-icon'><RxCrossCircled /></button>
                </div>
            </div>
        </div>
    );
};
export default ReviewIteam;
