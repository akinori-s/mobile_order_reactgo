import React, { useState } from 'react';
import { useCart } from '../contexts/cartContext.jsx';

function CartPage() {
	const { cart, setCart } = useCart();

	const handleQuantityChange = (id, change) => {
		setCart(prevItems => 
			prevItems.map(item => 
				item.id === id ? { ...item, quantity: item.quantity + change } : item
			)
		);
	}

	return (
        <div className="h-4/5 overflow-y-scroll bg-gray-100 divide-y">
			<div></div>
            { (cart.length === 0) ?
				<div className="flex justify-center items-center h-full">
					<span className="text-2xl">Your cart is empty</span>
				</div>
			:
			cart.map(item => (
				<div key={item.id} className="flex items-center p-4">
                    <img src={item.thumbnail} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                    <div className="flex-grow">
                        <span className="block font-bold">{item.name}</span>
                        <span className="block text-sm text-gray-500">${item.price.toFixed(2)} each</span>
                    </div>
					<div className="flex flex-col items-center">
						<div className="flex items-center">
							<button 
								onClick={() => handleQuantityChange(item.id, -1)} 
								className="bg-red-500 text-white px-2 py-1 rounded-l"
								disabled={item.quantity <= 1}
								>
								-
							</button>
							<span className="border-t border-b px-4 py-1 mx-2">{item.quantity}</span>
							<button 
								onClick={() => handleQuantityChange(item.id, 1)} 
								className="bg-green-500 text-white px-2 py-1 rounded-r"
							>
								+
							</button>
						</div>
						<span className="mt-2 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
					</div>
                </div>
            ))}
			<div></div>
        </div>
    );
}

export default CartPage;
