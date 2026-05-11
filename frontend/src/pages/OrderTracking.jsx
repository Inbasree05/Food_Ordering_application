import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, CheckCircle2, Circle, Clock, UtensilsCrossed, Truck, PackageCheck, ChevronLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!user || !user.token) return;

        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, config);
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    
    // Poll for status updates every 10 seconds
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const steps = [
    { name: 'Placed', icon: <PackageCheck className="w-6 h-6" />, status: 'Placed' },
    { name: 'Preparing', icon: <UtensilsCrossed className="w-6 h-6" />, status: 'Preparing' },
    { name: 'Out for Delivery', icon: <Truck className="w-6 h-6" />, status: 'Out for Delivery' },
    { name: 'Delivered', icon: <CheckCircle2 className="w-6 h-6" />, status: 'Delivered' },
  ];

  const getCurrentStepIndex = () => {
    if (!order) return 0;
    return steps.findIndex(step => step.status === order.status);
  };

  if (loading && !order) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center gap-4">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        <p className="text-slate-400 font-medium">Locating your order...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center p-4">
        <div className="bg-slate-800 p-8 rounded-3xl border border-red-500/30 text-center max-w-md">
          <p className="text-red-500 font-bold text-xl mb-2">Error loading tracker</p>
          <p className="text-slate-400 mb-6">{error}</p>
          <Link to="/menu" className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold">Back to Menu</Link>
        </div>
      </div>
    );
  }

  const currentIdx = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-slate-900 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        
        <Link to="/menu" className="inline-flex items-center text-slate-400 hover:text-orange-500 mb-8 transition-colors">
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-slate-800 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-orange-500 font-black text-xs uppercase tracking-widest mb-1">Live Tracking</p>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-50">Order #{id.slice(-6).toUpperCase()}</h1>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-2xl flex items-center gap-3">
                <Clock className="text-orange-500" size={20} />
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Estimated Time</p>
                  <p className="text-sm font-black text-slate-50">25-30 Mins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="p-6 sm:p-10">
            <div className="relative flex justify-between">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700 -translate-y-1/2 z-0"></div>
              <div 
                className="absolute top-1/2 left-0 h-1 bg-orange-500 -translate-y-1/2 z-0 transition-all duration-1000 ease-out"
                style={{ width: `${(currentIdx / (steps.length - 1)) * 100}%` }}
              ></div>

              {steps.map((step, idx) => (
                <div key={step.name} className="relative z-10 flex flex-col items-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${
                    idx <= currentIdx 
                      ? 'bg-orange-500 text-white scale-110' 
                      : 'bg-slate-700 text-slate-500'
                  }`}>
                    {step.icon}
                  </div>
                  <p className={`mt-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center ${
                    idx <= currentIdx ? 'text-slate-50' : 'text-slate-500'
                  }`}>
                    {step.name}
                  </p>
                  {idx === currentIdx && (
                    <div className="absolute -top-12 bg-white text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black shadow-lg animate-bounce">
                      Current Status
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Details Mini-Summary */}
          <div className="bg-slate-900/50 p-6 sm:p-8 border-t border-slate-700/50">
            <h3 className="text-slate-50 font-bold mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
              Your Delivery Summary
            </h3>
            <div className="space-y-4">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-800/50 p-3 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-3">
                    <img src={item.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="text-slate-50 text-sm font-bold">{item.name}</p>
                      <p className="text-slate-500 text-[10px]">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p className="text-slate-50 text-sm font-black">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center pt-6 border-t border-slate-700/50">
                <p className="text-slate-500 text-xs font-bold uppercase">Total Amount Paid</p>
                <p className="text-2xl font-black text-orange-500">${order.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Support Card */}
        <div className="mt-8 bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-blue-500 text-xs font-black uppercase">Need help?</p>
              <p className="text-slate-300 text-sm">Our support team is available 24/7</p>
            </div>
          </div>
          <button className="text-blue-500 font-bold text-sm hover:underline">Contact Us</button>
        </div>

      </div>
    </div>
  );
};

export default OrderTracking;
