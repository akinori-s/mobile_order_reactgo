import '../App.css'

function Carousel() {

	return (
		<div className="h-1/3 overflow-x-scroll whitespace-nowrap py-2">
			<div className="inline-block align-middle w-2/3 h-full bg-blue-500 mx-2 rounded-md"></div>
			<div className="inline-block align-middle w-2/3 h-full bg-red-500 mx-2 rounded-md"></div>
			<div className="inline-block align-middle w-2/3 h-full bg-green-500 mx-2 rounded-md"></div>
		</div>
	)
}

export default Carousel
