import React from 'react';
import { Link } from 'react-router-dom';
import { executeCheckout } from '../api/checkoutApi.js'
import { useCart } from '../contexts/cartContext.jsx';

function CheckoutPage() {
	const { cart, setCart } = useCart();

  const handleCheckout = async () => {
    // remove unnecessary fields. wip: find a better way to do this
    const tmpCart = [...cart];
    tmpCart.forEach((item) => {
      delete item.name;
      delete item.price;
      delete item.img_path;
      delete item.category_id;
    });
    try {
      const data = await executeCheckout(tmpCart);
      if (data) {
        setCart([]);
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-scroll px-6 mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Cart</h2>
          <div className="h-4/5 overflow-y-scroll bg-gray-100 divide-y">
            <div></div>
            { (cart.length === 0) ?
              <div className="flex justify-center items-center h-full">
                <span className="text-lg">Your cart is empty</span>
              </div>
            :
            cart.map(item => (
              <div key={item.id} className="flex items-center p-4">
                <img 
                  src={item.img_path} 
                  alt={item.name} 
                  className="w-12 h-12 object-cover rounded mr-4" 
                />
                <div className="flex-grow">
                    <span className="block font-bold">{item.name}</span>
                    <span className="block text-sm text-gray-500">${item.price.toFixed(2)} each</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="px-4 py-1 w-auto text-center">
                    {`Qty: ${item.quantity}`}
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              ))}
            <div></div>
          </div>
          <div className="flex justify-center mt-3">
            <Link 
              className='px-2 py-1 text-sm bg-blue-500 text-white text-center text-lg rounded items-end w-1/3'
              to={`${(cart.length === 0) ? '/' : '/cart'}`}
            >
                {`${(cart.length === 0) ? 'Go to menu' : 'Edit cart'}`}
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Billing Information</h2>
          <input className="border p-2 w-full mb-2" type="text" placeholder="Full Name" />
          <input className="border p-2 w-full mb-2" type="text" placeholder="Address Line 1" />
          <input className="border p-2 w-full mb-2" type="text" placeholder="Address Line 2 (optional)" />
          <input className="border p-2 w-full mb-2" type="text" placeholder="City" />
          <input className="border p-2 w-full mb-2" type="text" placeholder="Postal Code" />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <label className="block mb-2">
            <input type="checkbox" className="mr-2" />
            Same as billing
          </label>
          <input className="border p-2 w-full mb-2" type="text" placeholder="Full Name" />
          <input className="border p-2 w-full mb-2" type="text" placeholder="Address Line 1" />
          <input className="border p-2 w-full mb-2" type="text" placeholder="Address Line 2 (optional)" />
          <input className="border p-2 w-full mb-2" type="text" placeholder="City" />
          <input className="border p-2 w-full mb-2" type="text" placeholder="Postal Code" />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <input className="border p-2 w-full mb-2" type="text" placeholder="Card Number" />
          <input className="border p-2 w-full mb-2" type="text" placeholder="Expiry MM/YY" />
          <input className="border p-2 w-full" type="text" placeholder="CVV" />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Order Review</h2>
          <div className="border p-4">
            <p>Item 1: $10.00</p>
            <p>Item 2: $20.00</p>
            <hr className="my-2" />
            <p>Total: $30.00</p>
          </div>
        </div>
      </div>

      <button 
        className="bg-blue-500 text-white p-4 mt-2 rounded w-full"
        onClick={() => handleCheckout()}
      >
        Confirm Purchase
      </button>
    </>
  );
}

export default CheckoutPage;