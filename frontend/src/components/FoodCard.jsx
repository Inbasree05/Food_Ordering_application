import React, { useContext } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="bg-slate-800 rounded-2xl border-2 border-orange-500/60 overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:border-red-500 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Link to={`/food/${food._id}`}>
          <img 
            src={food.image} 
            alt={food.name} 
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-slate-50 text-xs font-bold px-3 py-1 rounded-full border border-slate-700/50">
          {food.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/food/${food._id}`}>
            <h3 className="text-slate-50 font-bold text-lg hover:text-red-500 transition-colors line-clamp-1">{food.name}</h3>
          </Link>
          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-1 rounded-md text-xs font-bold border border-amber-500/20 shrink-0">
            <Star size={12} fill="currentColor" />
            <span>{food.rating}</span>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm mt-1 mb-4 flex-grow line-clamp-2">
          {food.description}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
          <span className="text-xl font-bold text-slate-50">${food.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(food)}
            className="flex items-center justify-center p-2 rounded-xl bg-slate-700 text-slate-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transform hover:scale-105"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
