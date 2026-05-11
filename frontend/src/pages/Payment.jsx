import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const Payment = () => {
  const { shippingAddress, savePaymentMethod, paymentMethod: currentPaymentMethod } = useContext(CartContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState(currentPaymentMethod || 'PayPal');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <CheckoutSteps step1 step2 step3 />

        <div className="bg-slate-800 py-8 px-4 shadow-xl shadow-red-500/5 sm:rounded-2xl border border-slate-700/50 sm:px-10 mt-8">
          <h2 className="mb-6 text-center text-3xl font-extrabold text-slate-50">
            Payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Method</span>
          </h2>
          
          <form className="space-y-6" onSubmit={submitHandler}>
            <fieldset>
              <legend className="block text-sm font-medium text-slate-300 mb-4">Select Method</legend>
              <div className="space-y-4">
                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'PayPal' ? 'border-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-700 bg-slate-900 hover:border-slate-500'}`}>
                  <input
                    type="radio"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-700 bg-slate-900 accent-red-500"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-3 block text-base font-medium text-slate-50">
                    PayPal or Credit Card
                  </span>
                </label>

                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'Stripe' ? 'border-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-700 bg-slate-900 hover:border-slate-500'}`}>
                  <input
                    type="radio"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-700 bg-slate-900 accent-red-500"
                    name="paymentMethod"
                    value="Stripe"
                    checked={paymentMethod === 'Stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-3 block text-base font-medium text-slate-50">
                    Stripe
                  </span>
                </label>

              </div>
            </fieldset>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.2)] text-base font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 focus:outline-none transition-all transform hover:scale-[1.02]"
              >
                Continue To Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
