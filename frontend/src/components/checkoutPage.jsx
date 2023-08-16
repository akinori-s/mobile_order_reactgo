import React from 'react';

function CheckoutPage() {
  return (
    <>
      <div className="flex-1 overflow-y-scroll px-6 mt-8">
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

      <button className="bg-blue-500 text-white p-4 mt-2 rounded w-full">
        Confirm Purchase
      </button>
    </>
  );
}

export default CheckoutPage;