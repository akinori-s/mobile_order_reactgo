import React, { createContext, useContext, useState } from "react";

const MenuCategoryContext = createContext();

export const useMenuCategory = () => {
	return useContext(MenuCategoryContext);
};

export function MenuCategoryProvider({ children }) {
	const [menuCategory, setMenuCategory] = useState([]);

	return (
		<MenuCategoryContext.Provider value={{ menuCategory, setMenuCategory }}>
			{children}
		</MenuCategoryContext.Provider>
	);
}
