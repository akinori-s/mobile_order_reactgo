import '../App.css'
import Carousel from './carousel.jsx'
import { Outlet } from "react-router-dom";

function AppLayout() {

	return (
		<>
			<Carousel />
			<Outlet />
		</>
	)
}

export default AppLayout
