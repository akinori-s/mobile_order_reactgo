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
			<div className="w-1/5 bg-gray-200 overflow-y-scroll divide-y">
				{menuCategory.map((category) => (
					<div key={category.id} className="py-2 pl-2 pr-2 border-slate-300 text-base md:text-xl lg:text-2xl">
						<a href={`#${category.name}`}>{ category.name }</a>
					</div>
				))}
			</div>

			{/* Vertical scrolling menu */}
			<div className="w-4/5 overflow-y-scroll flex flex-wrap divide-y divide-x items-stretch">
				<div></div>
				{menuCategory.map((category) => (
					<>
					<h2 
						key={category.id} 
						id={category.name}
						className='w-full text-left text-2xl p-2 font-bold bg-white'
					>
						{ category.name }
					</h2>
					{menu.filter(item => item.category_id == category.id).map((item) => (
					<div key={item.id} className="bg-white p-3 flex flex-col w-1/2 md:w-1/3 lg:w-1/4 justify-between">
						<img 
							src={`${item.img_path}`} 
							alt={`${item.name} image`} 
							className="w-full h-24 md:h-28 lg:h-36 object-cover mb-2 rounded"
						/>
						<div className="text-center mb-2">{ item.name }</div>
						<button className="px-2 py-1 text-sm bg-blue-500 text-white rounded w-full">
							Add to Cart
						</button>
					</div>
					))}
					</>
				))}
			</div>
		</div>
	)
}

export default MenuPage
