import React, { useState } from 'react';

function CartPage() {
	const [cartItems, setCartItems] = useState([
		{
            id: 1,
            name: "Sample Item 1",
            quantity: 1,
            price: 10.00,
            thumbnail: "https://via.placeholder.com/50"
        },
        {
            id: 2,
            name: "Sample Item 2",
            quantity: 2,
            price: 15.00,
            thumbnail: "https://via.placeholder.com/50"
        },
	]);

	const handleQuantityChange = (id, change) => {
		setCartItems(prevItems => 
			prevItems.map(item => 
				item.id === id ? { ...item, quantity: item.quantity + change } : item
			)
		);
	}

	return (
        <div className="h-4/5 overflow-y-scroll bg-gray-100 divide-y">
			<div></div>
            {cartItems.map(item => (
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
