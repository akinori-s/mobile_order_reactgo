import './App.css'
import MenuPage from './components/menuPage.jsx'
import CartPage from './components/cartPage.jsx'

function App() {

	return (
		<>
			<div className="flex flex-col bg-gray-100 h-screen">
				{/* Carousel */}
				<div className="h-1/3 overflow-x-scroll whitespace-nowrap py-2">
					<div className="inline-block align-middle w-2/3 h-full bg-blue-500 mx-2 rounded-md"></div>
					<div className="inline-block align-middle w-2/3 h-full bg-red-500 mx-2 rounded-md"></div>
					<div className="inline-block align-middle w-2/3 h-full bg-green-500 mx-2 rounded-md"></div>
				</div>

				{/* <MenuPage /> */}
				<CartPage />

				{/* Footer */}
				<div className="bg-gray-900 h-16">
					<div className="flex justify-around items-center h-full">
						<button className="text-white">Menu</button>
						<button className="text-white">Cart</button>
						<button className="text-white">Checkout</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
