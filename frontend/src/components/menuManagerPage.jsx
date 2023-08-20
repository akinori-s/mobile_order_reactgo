import '../App.css'
import React, { useState, useEffect } from 'react'
import { getMenuList, getMenuCategoryList, addMenuItem, updateMenuItem, deleteMenuItem } from '../api/menuApi.js'
import { useMenu } from '../contexts/menuContext.jsx';
import { useMenuCategory } from '../contexts/menuCategoryContext.jsx';

function MenuManager() {
	const { menu, setMenu } = useMenu();
	const { menuCategory, setMenuCategory } = useMenuCategory();
	const [ tmpItems, setTmpItems ] = useState([]);
	const [ editMode, setEditMode ] = useState({});
	const [ newItemToggle, setNewItemToggle ] = useState(false);
	const [ newItem, setNewItem ] = useState({
		name: '',
		img_path: '',
		price: '',
		category_id: ''
	});

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
				if (data) {
					setMenuCategory(data);
					handleNewItemChange('category_id', data[0].id);
				}
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

	const handleNewItemChange = (field, value) => {
		if (field === 'category_id') {
			value = parseInt(value, 10);
		}
		setNewItem((prevItem) => ({
			...prevItem,
			[field]: value
		}));
	};

	const handleAddNewItem = async () => {
		try {
			console.log("Adding new item:", newItem);
			await addMenuItem(newItem);
		} catch (error) {
			console.error('Failed to add item:', error); // wip: should display error as a nice looking alert
			return;
		}
		setMenu([newItem, ...menu]);
		setNewItem({
			name: '',
			img_path: '',
			price: '',
			category_id: menuCategory[0].id
		});
	};

	const handleInputChange = (itemId, field, value) => {
		if (field === 'category_id') {
			value = parseInt(value, 10);
		}
		const newItem = menu.find(item => item.id === itemId);
		newItem[field] = value;
		const newMenuItems = menu.map((item) => (
			item.id === itemId ? newItem : item
		));
		setMenu(newMenuItems);
		console.log("handle input changenew menus: ", newMenuItems);
		console.log("handle input change: ", menu);
		console.log("handle input change tmp: ", tmpItems);
	};

	const handleDeleteMenuItem = async (id) => {
		try {
			await deleteMenuItem(id);
			setMenu(menu.filter(item => item.id !== id));
		} catch (error) {
			console.error('Failed to delete item:', error); // wip: should display error as a nice looking alert
		}
	};
	
	const toggleEditMode = (id) => {
		if (!editMode[id]) {
			const tmp = {...menu.find(item => item.id === id)};
			console.log("toggle edit tmp: ", tmp);
			const currentTmpItems = [...tmpItems, tmp];
			console.log("toggle edit currentTmpItems: ", currentTmpItems);
			setTmpItems(currentTmpItems);
			console.log("toggle edit tmpItems: ", tmpItems);
		}
		setEditMode((prevMode) => ({
			...prevMode,
			[id]: !prevMode[id]
		}));
	};
	
	const saveChanges = async (id) => {
		try {
			await updateMenuItem(menu.find(item => item.id === id));
		} catch (error) {
			console.error('Failed to update item:', error); // wip: should display error as a nice looking alert
			return;
		}
		toggleEditMode(id);
		setTmpItems(prevItems => prevItems.filter(item => item.id !== id));
		console.log("save changes: ", menu);
	};
	
	const discardChanges = (id) => {
		console.log("discard changes tmpItems: ", tmpItems);
		const tmpItem = tmpItems.find(item => item.id === id);
		console.log("discard changes tmpItem: ", tmpItem);
		setMenu(menu.map(item => item.id === id ? tmpItem : item));
		setTmpItems(prevItems => prevItems.filter(item => item.id !== id));
		toggleEditMode(id);
	};

	return (
	<div className="flex flex-row bg-gray-100 h-screen">
	<div className="flex flex-col justify-center px-4 w-1/5 bg-gray-200 overflow-y-scroll divide-y">
		<h2>Manage Menu</h2>
		<h2>Manage Menu Category</h2>
	</div>
	<div className="w-4/5 flex flex-wrap">
		<div className="p-8">
			<h1 className="text-3xl mb-6">Edit Menu Items</h1>
		</div>
		<div className='w-full flex flex-row flex-wrap px-6 overflow-x-scroll border-b-2 divide-x'>
			{menuCategory.map((category) => (
				<div 
					key={`navbar-${category.id}`} 
					className="py-3 pl-2 pr-2 border-slate-300 text-base md:text-xl lg:text-2xl">
					{category.name}
				</div>
			))}
			<button 
				className="bg-green-500 hover:bg-green-700 text-white font-bold ml-8 my-2 px-4 rounded"
				onClick={() => {setNewItemToggle(!newItemToggle)}} 
			>
				Add New Item
			</button>
		</div>
		<div className={`${newItemToggle ? 'max-h-96' : 'max-h-0'} overflow-hidden transition-all ease-in-out duration-500`}>
			<div className="w-5/6 flex flex-row justify-between items-center p-4">
				<div className="flex flex-col items-start mb-4 md:mb-0 space-y-4">
					<input
						type="text"
						value={newItem.name}
						onChange={(e) => handleNewItemChange('name', e.target.value)}
						className="w-full p-2 border rounded-md"
						placeholder="Item Name"
					/>
					<input
						type="text"
						value={newItem.img_path}
						onChange={(e) => handleNewItemChange('img_path', e.target.value)}
						className="w-full p-2 border rounded-md"
						placeholder="Image URL"
					/>
				</div>
				<div className="flex flex-col items-start space-y-4">
					<input
						type="number"
						value={newItem.price}
						onChange={(e) => handleNewItemChange('price', parseFloat(e.target.value))}
						className="w-full p-2 border rounded-md"
						placeholder="Price"
					/>
					<select
						value={newItem.category_id}
						onChange={(e) => handleNewItemChange('category_id', e.target.value)}
						className="w-full p-2 border rounded-md"
					>
						{menuCategory.map((cat) => (
					<option key={`newItem-${cat.id}`} value={cat.id}>
							{cat.name}
						</option>
						))}
					</select>
				</div>
				<button 
					onClick={() => handleAddNewItem()}
					className="px-2 py-1 bg-green-500 text-white rounded"
				>
					Add Item
				</button>
			</div>
		</div>
		<div className="overflow-y-scroll flex flex-wrap divide-y divide-x items-stretch scroll-smooth">
			{menuCategory.map((category) => (
			<React.Fragment key={category.id}>
			<h2 
				key={`category-header-${category.id}`} 
				id={category.name}
				className='w-full text-left text-2xl p-2 font-bold bg-white'
			>
				{ category.name }
			</h2>
			<div className="w-5/6 divide-y">
				{menu.filter(item => item.category_id == category.id).map((item, index) => (
				<div key={`menu-item-list-${item.id}`} className="flex flex-col md:flex-row justify-between items-start p-4 space-x-4">
					<div className="flex items-center mb-4 md:mb-0">
						<img src={item.img_path} alt={item.name} className="w-16 h-16 object-cover mr-4" />
					</div>
					<div className="flex flex-col flex-wrap items-start space-y-3">
						<input
							type="text"
							value={item.name}
							onChange={(e) => handleInputChange(item.id, 'name', e.target.value)}
							className="p-2 border rounded-md"
							placeholder="Item Name"
							disabled={!editMode[item.id]}
						/>
						<input
							type="text"
							value={item.img_path}
							onChange={(e) => handleInputChange(item.id, 'img_path', e.target.value)}
							className="p-2 border rounded-md"
							placeholder="Image URL"
							disabled={!editMode[item.id]}
						/>
					</div>
					<div className="flex flex-col flex-wrap items-start space-y-3">
						<input
							type="number"
							value={item.price}
							onChange={(e) => handleInputChange(item.id, 'price', parseFloat(e.target.value))}
							className="p-2 border rounded-md"
							placeholder="Price"
							disabled={!editMode[item.id]}
						/>
						<select
							value={item.category_id}
							onChange={(e) => handleInputChange(item.id, 'category_id', e.target.value)}
							className="p-2 border rounded-md"
							disabled={!editMode[item.id]}
						>
							{menuCategory.map((cat) => (
							<option key={`category-id-${item.id}-${cat.id}`} value={cat.id}>
								{cat.name}
							</option>
							))}
						</select>
					</div>
					{!editMode[item.id] ? (
						<div className="flex flex-col space-y-2">
						<button 
							onClick={() => toggleEditMode(item.id)}
							className="px-2 py-1 bg-blue-500 text-white rounded w-full" 
						>
							Edit
						</button>
						<button 
							onClick={() => handleDeleteMenuItem(item.id)}
							className="px-2 py-1 bg-gray-500 text-white rounded w-full" 
						>
							Delete
						</button>
						</div>
					) : (
						<div className="flex flex-col space-y-2">
						<button 
							onClick={() => saveChanges(item.id)}
							className="px-2 py-1 bg-blue-500 text-white rounded w-full" 
							>
							Save
						</button>
						<button 
							onClick={() => discardChanges(item.id)}
							className="px-2 py-1 bg-gray-400 text-white rounded w-full" 
						>
							Cancel
						</button>
						</div>
					)}
				</div>
				))}
			</div>
			</React.Fragment>
			))}
		</div>
	</div>
	</div>
	);
}

export default MenuManager;
