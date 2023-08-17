import axios from 'axios';

const BASE_URL = "http://localhost:8080";
const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export const getMenuList = async () => {
	try {
		const response = await api.get(`/menus`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const getMenuCategoryList = async () => {
	try {
		const response = await api.get(`/menu_categories`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
