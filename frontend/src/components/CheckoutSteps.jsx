import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="flex items-center w-full max-w-3xl">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center flex-1 relative">
          <Link to="/login" className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step1 ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
            {step2 ? <Check size={20} /> : '1'}
          </Link>
          <span className={`text-sm mt-2 font-medium ${step1 ? 'text-slate-50' : 'text-slate-500'}`}>Sign In</span>
          {/* Connector Line */}
          <div className={`absolute top-5 left-1/2 w-full h-1 -z-0 ${step2 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-slate-800'}`}></div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center flex-1 relative">
          <Link to="/shipping" className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step2 ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
            {step3 ? <Check size={20} /> : '2'}
          </Link>
          <span className={`text-sm mt-2 font-medium ${step2 ? 'text-slate-50' : 'text-slate-500'}`}>Shipping</span>
          <div className={`absolute top-5 left-1/2 w-full h-1 -z-0 ${step3 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-slate-800'}`}></div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center flex-1 relative">
          <Link to="/payment" className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step3 ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
            {step4 ? <Check size={20} /> : '3'}
          </Link>
          <span className={`text-sm mt-2 font-medium ${step3 ? 'text-slate-50' : 'text-slate-500'}`}>Payment</span>
          <div className={`absolute top-5 left-1/2 w-full h-1 -z-0 ${step4 ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-slate-800'}`}></div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center flex-1 relative">
          <Link to="/placeorder" className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 transition-colors ${step4 ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
            4
          </Link>
          <span className={`text-sm mt-2 font-medium ${step4 ? 'text-slate-50' : 'text-slate-500'}`}>Place Order</span>
        </div>

      </div>
    </div>
  );
};

export default CheckoutSteps;
