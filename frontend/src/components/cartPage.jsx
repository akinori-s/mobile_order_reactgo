import React, { useState } from 'react';
import { useCart } from '../contexts/cartContext.jsx';

function CartPage() {
	const { cart, setCart } = useCart();

	const handleQuantityChange = (id, change) => {
		setCart(prevItems => 
			prevItems.map(item => {
				let adjChange = change;
				if (item.quantity + change < 1)
					adjChange = 0;
				else if (item.quantity + change > 50)
					adjChange = 0;
				return (item.id === id ? { ...item, quantity: item.quantity + adjChange } : item);
			})
		);
	}

	const handleQuantityInput = (id, value) => {
		if (value < 1)
			value = 1;
		else if (value > 50)
			value = 50;
		setCart(prevItems =>
			prevItems.map(item =>
				item.id === id ? { ...item, quantity: value } : item
			)
		);
	}

	return (
        <div className="h-4/5 overflow-y-scroll bg-gray-100 divide-y">
			<h2 className='w-full text-left text-2xl p-2 font-bold'>
				Your Cart
			</h2>
            { (cart.length === 0) ?
				<div className="flex justify-center items-center h-full">
					<span className="text-2xl">Your cart is empty</span>
				</div>
			:
			cart.map(item => (
				<div key={item.id} className="flex items-center p-4">
                    <img 
						src={item.img_path} 
						alt={item.name} 
						className="w-12 h-12 object-cover rounded mr-4" 
					/>
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
							<input 
								type="number" 
								className="border-t border-b px-4 py-1 w-12 text-center" 
								min="1"
								max="50"
								onChange={e => handleQuantityInput(item.id, e.target.value)}
								value={item.quantity} 
							/>
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
