import '../App.css'

function MenuPage() {

	return (
		<div className="h-4/5 flex overflow-hidden">
			{/* Sidebar */}
			<div className="w-1/5 bg-gray-200 overflow-y-scroll">
				<div className="py-2 pl-2 pr-2 border-b">Category 1</div>
				<div className="py-2 pl-2 pr-2 border-b">Category 2</div>
				<div className="py-2 pl-2 pr-2 border-b">Category 3</div>
				<div className="py-2 pl-2 pr-2 border-b">Category 3</div>
				<div className="py-2 pl-2 pr-2 border-b">Category 3</div>
				<div className="py-2 pl-2 pr-2 border-b">Category 3</div>
				<div className="py-2 pl-2 pr-2 border-b">Category 3</div>
			</div>

			{/* Vertical scrolling menu */}
			<div className="w-4/5 overflow-y-scroll flex flex-wrap divide-y divide-x items-start">
				<div></div>
				{["Item1", "Item2", "Item3", "Item3", "Item3", "Item3"].map((item, idx) => (
					<div key={idx} className="bg-white p-4 flex flex-col w-1/2 md:w-1/3 lg:w-1/4">
					<img 
						src="https://via.placeholder.com/100" 
						alt={`Item ${idx + 1} image`} 
						className="w-full h-24 object-cover mb-4 rounded"
					/>
					<div className="text-center mb-4">Item {idx + 1}</div>
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
