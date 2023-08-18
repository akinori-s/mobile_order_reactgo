import './App.css'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MenuPage from './components/menuPage.jsx'
import CartPage from './components/cartPage.jsx'
import FooterBar from './components/footerBar.jsx'
import AppLayout from './components/appLayout.jsx'
import CheckoutPage from './components/checkoutPage.jsx'
import { MenuProvider } from './contexts/menuContext.jsx'
import { MenuCategoryProvider } from './contexts/menuCategoryContext.jsx'
import { PromotionProvider } from './contexts/promotionContext.jsx'
import { CartProvider } from './contexts/cartContext.jsx'

function App() {

	return (
		<div className="flex flex-col bg-gray-100 h-screen">
			<BrowserRouter>
				<MenuProvider>
				<MenuCategoryProvider>
				<PromotionProvider>
				<CartProvider>
					<Routes>
						<Route element={<AppLayout />}>
							<Route path='/' element={<MenuPage />} />
							<Route path='/cart' element={<CartPage />} />
						</Route>
						<Route path='/checkout' element={<CheckoutPage />} />
					</Routes>
					<FooterBar />
				</CartProvider>
				</PromotionProvider>
				</MenuCategoryProvider>
				</MenuProvider>
			</BrowserRouter>
		</div>
	)
}

export default App
