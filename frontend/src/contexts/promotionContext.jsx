import React, { createContext, useContext, useState } from "react";

const PromotionContext = createContext();

export const usePromotion = () => {
	return useContext(PromotionContext);
};

export function PromotionProvider({ children }) {
	const [promotions, setPromotions] = useState([]);

	return (
		<PromotionContext.Provider value={{ promotions, setPromotions }}>
			{children}
		</PromotionContext.Provider>
	);
}
