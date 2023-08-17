import axios from 'axios';

const BASE_URL = "http://localhost:8080";
const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export const getPromotionList = async () => {
	try {
		const response = await api.get(`/promotions`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
