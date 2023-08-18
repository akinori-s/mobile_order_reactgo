import '../App.css'
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/cartContext.jsx';

function FooterBar() {
	const { cart } = useCart();

	return (
		<div className="bg-gray-900 h-16">
			<div className="flex justify-around items-center h-full">
				<Link 
					to='/' 
					className="text-white text-lg md:text-xl lg:text-2xl"
				>
					Menu
				</Link>
				<Link 
					to='/cart' 
					className="text-white text-lg md:text-xl lg:text-2xl"
				>
					{ cart.length > 0 ? `Cart (${cart.length})` : 'Cart' }
				</Link>
				<Link 
					to='/checkout' 
					className="text-white text-lg md:text-xl lg:text-2xl"
				>
					Checkout
				</Link>
			</div>
		</div>
	)
}

export default FooterBar
