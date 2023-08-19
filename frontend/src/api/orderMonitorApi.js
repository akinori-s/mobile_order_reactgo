import axios from 'axios';

const BASE_URL = "http://localhost:8080";
const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export const getPendingOrderList = async () => {
	try {
		const response = await api.get(`/orders`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const setOrderStatusComplete = async (orderID) => {
	try {
		const response = await api.put(`/orders/complete-order`, orderID);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
