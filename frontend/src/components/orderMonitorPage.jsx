import React, { useState, useEffect } from 'react';
import { getPendingOrderList, setOrderStatusComplete } from '../api/orderMonitorApi.js';

function OrderMonitor() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getPendingOrderList();
				setOrders(response);
			} catch (error) {
				console.error("Failed to fetch:", error);
			}
		};
		fetchData();

		// Set up the interval
		const intervalId = setInterval(fetchData, 60000); // 60000ms = 1 minute

		// Clear interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	const completeOrder = async (orderID) => {
		try {
			const data = await setOrderStatusComplete(orderID);
		} catch (error) {
			console.error("Failed to complete order:", error);
			return;
		}
		const newOrders = orders.filter(order => order.id !== orderID);
		setOrders(newOrders);
	};

	return (
		// wip: make the frontend look nice
		<div className="p-8">
			<h1 className="text-2xl mb-4">Orders</h1>
			<div className='divide-y'>
				{orders.map(order => (
				<div key={order.id} className="border-gray-200 px-2 py-4">
					<div className="flex justify-between items-center">
						<span>{new Date(order.datetime).toLocaleTimeString()}</span>
						<span className='text-gray-400'>Order ID: {order.id}</span>
					</div>
					<div className='px-6'>
						{order.items.map(item => (
							<div key={`${order.id}-${order.id}-${item.transaction_detail_id}`} className="flex justify-between mt-1 last:border-b">
								<span>{item.item_name} (x{item.quantity})</span>
								<span>{item.subtotal.toFixed(2)}</span>
							</div>
						))}
					</div>
					<div className='flex flex-row justify-between items-start mt-2 pr-6'>
						<button 
							className="bg-green-500 text-white px-4 py-1 rounded" 
							onClick={() => completeOrder(order.id)}
						>
							Complete
						</button>
						<span>Status: {order.status}</span>
						<span>Total: ${order.total_price}</span>
					</div>
				</div>
				))}
			</div>
		</div>
	);
}

export default OrderMonitor;
