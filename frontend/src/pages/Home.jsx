import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Truck } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-slate-900">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-slate-50 sm:text-5xl md:text-6xl">
              <span className="block">Hungry? We're here</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">to deliver hot food.</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-slate-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Order from your favorite restaurants and track your delivery in real-time. Fast, fresh, and right to your door.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-shadow">
                <Link to="/menu" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 md:py-4 md:text-lg md:px-10 transition-colors">
                  Order Now
                  <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-600 opacity-20 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-orange-500 opacity-10 blur-[120px] pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-slate-800 border border-slate-700/50 hover:border-red-500/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Fast Delivery</h3>
              <p className="text-slate-400">Get your food delivered in under 30 minutes, piping hot and ready to eat.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-800 border border-slate-700/50 hover:border-orange-500/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Top Quality</h3>
              <p className="text-slate-400">We partner with only the best restaurants to ensure premium quality food.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-slate-800 border border-slate-700/50 hover:border-red-500/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)] transition-all duration-300">
              <div className="mx-auto w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Live Tracking</h3>
              <p className="text-slate-400">Track your order from the kitchen all the way to your doorstep in real-time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
