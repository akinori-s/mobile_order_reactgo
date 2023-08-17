import '../App.css'

function Carousel() {

	return (
		<div className="h-1/3 overflow-x-scroll whitespace-nowrap py-2 pl-2">
			<div className="inline-block align-middle w-4/5 md:w-4/6 lg:w-3/6 h-full bg-blue-500 mr-2 rounded-md"></div>
			<div className="inline-block align-middle w-4/5 md:w-4/6 lg:w-3/6 h-full bg-red-500 mr-2 rounded-md"></div>
			<div className="inline-block align-middle w-4/5 md:w-4/6 lg:w-3/6 h-full bg-green-500 mr-2 rounded-md"></div>
		</div>
	)
}

export default Carousel
