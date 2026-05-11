import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import { Loader2, Search, SlidersHorizontal } from 'lucide-react';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const catQuery = category !== 'All' ? `&category=${category}` : '';
        const { data } = await axios.get(`http://localhost:5000/api/foods?keyword=${keyword}${catQuery}`);
        setFoods(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFoods();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, category]);

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-50">
              Our <span className="text-orange-500">Menu</span>
            </h1>
            <p className="text-slate-500 text-xs mt-1">Discover the best food from top restaurants</p>
          </div>

          <div className="flex items-center gap-3 w-full md:max-w-md">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search for food or restaurants..." 
                className="w-full bg-slate-800 border border-slate-700 text-slate-50 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-orange-500 transition-colors text-sm"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl hover:text-orange-500 transition-colors">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-3 pb-6 scrollbar-hide mb-2">
          {['All', 'Pizza', 'Burger', 'Sushi', 'Pasta', 'Vegan', 'Rice', 'South Indian'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full border text-xs font-bold transition-all ${
                category === cat 
                  ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-orange-500/50 hover:text-orange-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            <p className="text-slate-500 text-sm font-medium">Fetching delicious meals...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-8 rounded-2xl text-center max-w-md mx-auto">
            <p className="font-bold text-lg">Oops! Something went wrong</p>
            <p className="text-xs mt-2 opacity-80">{error}</p>
          </div>
        ) : foods.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-600" size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-50">No results found</h3>
            <p className="text-slate-500 text-sm mt-2">Try searching for something else</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;
