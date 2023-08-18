import '../App.css'
import { useState, useEffect } from 'react'
import { getPromotionList } from '../api/promotionApi.js'
import { usePromotion } from '../contexts/promotionContext.jsx';

function Carousel() {
	const { promotions, setPromotions } = usePromotion();

	useEffect(() => {
		async function getPromotions() {
			try {
				const data = await getPromotionList();
				if (data)
					setPromotions(data);
				else
					setPromotions([]);
			} catch (error) {
				console.error("Failed to fetch promotions:", error);
			}
		}
		if (promotions.length === 0)
			getPromotions();
	}, []);

	return (
		<div className="h-1/3 overflow-x-scroll whitespace-nowrap py-2 pl-2">
			{promotions.map((promotion) => (
				<div key={promotion.id} className="inline-block align-middle w-4/5 md:w-4/6 lg:w-3/6 h-full mr-2 rounded-md">
					<img src={promotion.img_path} alt={promotion.title} className="w-full h-full object-cover rounded-md" />
				</div>
			))}
		</div>
	)
}

export default Carousel
