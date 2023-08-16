import './App.css'

function App() {

  return (
    <>
      <div className="flex flex-col bg-gray-100 h-screen">
        {/* Carousel */}
        <div className="h-2/5 overflow-x-scroll whitespace-nowrap py-4">
          {/* Sample carousel items */}
          <div className="inline-block w-2/3 h-full bg-blue-500 mx-2 rounded-md"></div>
          <div className="inline-block w-2/3 h-full bg-red-500 mx-2 rounded-md"></div>
          <div className="inline-block w-2/3 h-full bg-green-500 mx-2 rounded-md"></div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/5 bg-gray-200 overflow-y-scroll">
            <div className="py-2 pl-2 pr-2 border-b">Category 1</div>
            <div className="py-2 pl-2 pr-2 border-b">Category 2</div>
            <div className="py-2 pl-2 pr-2 border-b">Category 3</div>
          </div>

          {/* Vertical scrolling menu */}
          <div className="w-4/5 overflow-y-scroll">
            <div className="p-4 border-b">Item 1</div>
            <div className="p-4 border-b">Item 2</div>
            <div className="p-4 border-b">Item 3</div>
            <div className="p-4 border-b">Item 4</div>
            <div className="p-4 border-b">Item 5</div>
            <div className="p-4 border-b">Item 6</div>
            <div className="p-4 border-b">Item 7</div>
            <div className="p-4 border-b">Item 8</div>
            <div className="p-4 border-b">Item 9</div>
            <div className="p-4 border-b">Item 10</div>
            <div className="p-4 border-b">Item 10</div>
            <div className="p-4 border-b">Item 10</div>
            <div className="p-4 border-b">Item 10</div>
            <div className="p-4 border-b">Item 10</div>
            <div className="p-4 border-b">Item 10</div>
            <div className="p-4 border-b">Item 10</div>
            <div className="p-4 border-b">Item 10</div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 h-20">
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
