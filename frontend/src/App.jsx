import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MenuPage from './components/menuPage.jsx'
import CartPage from './components/cartPage.jsx'
import FooterBar from './components/footerBar.jsx'
import AppLayout from './components/appLayout.jsx'
import CheckoutPage from './components/checkoutPage.jsx'

function App() {

	return (
		<div className="flex flex-col bg-gray-100 h-screen">
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route path='/' element={<MenuPage />} />
						<Route path='/cart' element={<CartPage />} />
					</Route>
					<Route path='/checkout' element={<CheckoutPage />} />
				</Routes>
			<FooterBar />
			</BrowserRouter>
		</div>
	)
}

export default App
