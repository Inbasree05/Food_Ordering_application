import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const Shipping = () => {
  const { shippingAddress, saveShippingAddress } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <CheckoutSteps step1 step2 />

        <div className="bg-slate-800 py-8 px-4 shadow-xl shadow-red-500/5 sm:rounded-2xl border border-slate-700/50 sm:px-10 mt-8">
          <h2 className="mb-6 text-center text-3xl font-extrabold text-slate-50">
            Shipping <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Address</span>
          </h2>
          
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-300">Address</label>
              <div className="mt-1">
                <input
                  type="text"
                  id="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-700 rounded-xl shadow-sm bg-slate-900 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                  placeholder="123 Main St"
                />
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-slate-300">City</label>
              <div className="mt-1">
                <input
                  type="text"
                  id="city"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-700 rounded-xl shadow-sm bg-slate-900 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                  placeholder="New York"
                />
              </div>
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-slate-300">Postal Code</label>
              <div className="mt-1">
                <input
                  type="text"
                  id="postalCode"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-700 rounded-xl shadow-sm bg-slate-900 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                  placeholder="10001"
                />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-slate-300">Country</label>
              <div className="mt-1">
                <input
                  type="text"
                  id="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-700 rounded-xl shadow-sm bg-slate-900 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                  placeholder="United States"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.2)] text-base font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 focus:outline-none transition-all transform hover:scale-[1.02]"
              >
                Continue To Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
