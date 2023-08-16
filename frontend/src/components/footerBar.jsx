import '../App.css'
import { Link } from 'react-router-dom';

function FooterBar() {

	return (
		<div className="bg-gray-900 h-16">
			<div className="flex justify-around items-center h-full">
				<Link to='/' className="text-white">Menu</Link>
				<Link to='/cart' className="text-white">Cart</Link>
				<button className="text-white">Checkout</button>
			</div>
		</div>
	)
}

export default FooterBar
