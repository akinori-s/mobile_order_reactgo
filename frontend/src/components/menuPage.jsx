import '../App.css'
import React, { useState, useEffect } from 'react'
import { getMenuList, getMenuCategoryList } from '../api/menuApi'
import { useMenu } from '../contexts/menuContext.jsx';
import { useMenuCategory } from '../contexts/menuCategoryContext.jsx';
import { useCart } from '../contexts/cartContext.jsx';

function MenuPage() {
	const { menu, setMenu } = useMenu();
	const { menuCategory, setMenuCategory } = useMenuCategory();
	const { cart, setCart } = useCart();

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
		if (menu.length === 0)
			getMenu();
		if (menuCategory.length === 0)
			getMenuCategory();
	}, []);

	function handleAddToCart(item) {
		const newCart = [...cart];
		const index = newCart.findIndex((cartItem) => cartItem.id === item.id);
		if (index > -1) {
			newCart[index].quantity += 1;
		} else {
			newCart.push({...item, quantity: 1});
		}
		setCart(newCart);
	};

	return (
		<div className="h-4/5 flex overflow-hidden">
			{/* Sidebar */}
			<div className="w-1/5 bg-gray-200 overflow-y-scroll divide-y">
				{menuCategory.map((category) => (
					<div key={category.id} className="py-3 pl-2 pr-2 border-slate-300 text-base md:text-xl lg:text-2xl">
						<a href={`#${category.name}`}>{ category.name }</a>
					</div>
				))}
			</div>

			{/* Vertical scrolling menu */}
			<div className="w-4/5 overflow-y-scroll flex flex-wrap divide-y divide-x items-stretch scroll-smooth">
				<div></div>
				{menuCategory.map((category) => (
					<React.Fragment key={category.id}>
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
						<button 
							className="px-2 py-1 text-sm bg-blue-500 text-white rounded w-full"
							onClick={() => handleAddToCart(item)}
						>
							Add to Cart
						</button>
					</div>
					))}
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

export default MenuPage
