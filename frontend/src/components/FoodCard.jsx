import React, { useContext } from 'react';
import { Star, ShoppingCart, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden hover:border-orange-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Link to={`/food/${food._id}`}>
          <img 
            src={food.image} 
            alt={food.name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';
            }}
          />
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-slate-50 text-[10px] uppercase tracking-wider font-black px-3 py-1 rounded-md border border-slate-700/50">
          {food.category}
        </div>

        {/* Offer Badge */}
        {food.offer && (
          <div className="absolute bottom-3 left-0 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-r-lg shadow-lg flex items-center gap-1">
            <Tag size={12} />
            {food.offer}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/food/${food._id}`}>
            <h3 className="text-slate-50 font-bold text-base group-hover:text-orange-500 transition-colors line-clamp-1">
              {food.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded text-xs font-bold shrink-0">
            <Star size={10} fill="currentColor" />
            <span>{food.rating}</span>
          </div>
        </div>

        {/* Hotel Name */}
        <p className="text-slate-400 text-xs font-medium mb-2">{food.hotelName}</p>
        
        <div className="flex items-center gap-4 text-[11px] text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{food.deliveryTime || '30 mins'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>•</span>
            <span>$${food.price.toFixed(2)} for one</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-700/50">
          <span className="text-lg font-black text-slate-50">${food.price.toFixed(2)}</span>
          <button 
            onClick={() => {
              console.log('Adding to cart:', food.name);
              addToCart(food);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white font-bold text-xs hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
          >
            <ShoppingCart size={14} />
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
