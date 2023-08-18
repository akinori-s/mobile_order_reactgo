import axios from 'axios';

const BASE_URL = "http://localhost:8080";
const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export const executeCheckout = async (cart) => {
	try {
		const response = await api.post(`/checkout`, cart);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
