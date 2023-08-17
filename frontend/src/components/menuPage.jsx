import '../App.css'
import { useState, useEffect } from 'react'
import { getMenuList, getMenuCategoryList } from '../api/menuApi'

function MenuPage() {
	const [menu, setMenu] = useState([]);
	const [menuCategory, setMenuCategory] = useState([]);

	useEffect(() => {
		async function getMenu() {
			try {
				const data = await getMenuList();
				if (data)
					setMenu(data);
				else
					setMenu([]);
			} catch (error) {
				console.error("Failed to fetch menu:", error);
			}
		}
		async function getMenuCategory() {
			try {
				const data = await getMenuCategoryList();
				if (data)
					setMenuCategory(data);
				else
					setMenuCategory([]);
			} catch (error) {
				console.error("Failed to fetch meny categories:", error);
			}
		}
		getMenu();
		getMenuCategory();
	}, []);

	return (
		<div className="h-4/5 flex overflow-hidden">
			{/* Sidebar */}
			<div className="w-1/5 bg-gray-200 overflow-y-scroll">
				{menuCategory.map((item) => (
					<div key={item.id} className="py-2 pl-2 pr-2 border-b">{ item.name }</div>
				))}
			</div>

			{/* Vertical scrolling menu */}
			<div className="w-4/5 overflow-y-scroll flex flex-wrap divide-y divide-x items-start">
				<div></div>
				{menu.map((item) => (
					<div key={item.id} className="bg-white p-3 flex flex-col w-1/2 md:w-1/3 lg:w-1/4">
					<img 
						src={`${item.img_path}`} 
						alt={`${item.name} image`} 
						className="w-full h-24 object-cover mb-2 rounded"
					/>
					<div className="text-center mb-2">{ item.name }</div>
					<button className="px-4 py-2 bg-blue-500 text-white rounded w-full">
						Add to Cart
					</button>
				</div>
				))}
			</div>
		</div>
	)
}

export default MenuPage
