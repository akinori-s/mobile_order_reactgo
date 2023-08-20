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

export const addMenuItem = async (menuItem) => {
	try {
		const response = await api.post(`/menus/add`, menuItem);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const updateMenuItem = async (menuItem) => {
	try {
		const response = await api.put(`/menus/update/${menuItem.id}`, menuItem);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const deleteMenuItem = async (id) => {
	try {
		const response = await api.delete(`/menus/delete/${id}`);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
