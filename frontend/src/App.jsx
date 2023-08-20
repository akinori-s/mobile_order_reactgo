import './App.css'
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import MenuPage from './components/menuPage.jsx'
import CartPage from './components/cartPage.jsx'
import FooterBar from './components/footerBar.jsx'
import AppLayout from './components/appLayout.jsx'
import CheckoutPage from './components/checkoutPage.jsx'
import OrderMonitor from './components/orderMonitorPage.jsx'
import MenuManager from './components/menuManagerPage.jsx'
import { MenuProvider } from './contexts/menuContext.jsx'
import { MenuCategoryProvider } from './contexts/menuCategoryContext.jsx'
import { PromotionProvider } from './contexts/promotionContext.jsx'
import { CartProvider } from './contexts/cartContext.jsx'

function App() {

	return (
		<div className="flex flex-col bg-gray-100 h-screen">
			<BrowserRouter>
                <Routes>
                    <Route path="/order-monitor" element={<OrderMonitor />} />
                    <Route path="/manage-menu" element={
                        <MenuProvider>
                        <MenuCategoryProvider>
                        <PromotionProvider>
                        <CartProvider>
                            <MenuManager />
                        </CartProvider>
                        </PromotionProvider>
                        </MenuCategoryProvider>
                        </MenuProvider>
                    } />

					{/* wip: need to better undestand how to make nested routes */}
                    <Route path="/" element={
                        <MenuProvider>
                        <MenuCategoryProvider>
                        <PromotionProvider>
                        <CartProvider>
                            <AppLayout>
                                <Outlet />
                            </AppLayout>
							<FooterBar />
                        </CartProvider>
                        </PromotionProvider>
                        </MenuCategoryProvider>
                        </MenuProvider>
                    }>
                        <Route index element={<MenuPage />} />
                        <Route path="cart" element={<CartPage />} />
                    </Route>
                    <Route path="/checkout" element={
                        <MenuProvider>
                        <MenuCategoryProvider>
                        <PromotionProvider>
                        <CartProvider>
							<CheckoutPage />
							<FooterBar />
                        </CartProvider>
                        </PromotionProvider>
                        </MenuCategoryProvider>
                        </MenuProvider>
                    }>
                    </Route>
                </Routes>
            </BrowserRouter>
		</div>
	)
}

export default App
