import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-50">
            Shopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Cart</span>
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700/50 text-center">
            <p className="text-slate-400 text-lg mb-6">Your cart is empty. Let's find something delicious!</p>
            <Link to="/menu" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50 flex flex-col sm:flex-row items-center gap-4 transition-all hover:border-slate-600">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/food/${item._id}`} className="text-lg font-bold text-slate-50 hover:text-red-500 transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-slate-400 text-sm">{item.category}</p>
                    <p className="text-red-500 font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <select 
                      value={item.qty} 
                      onChange={(e) => updateQuantity(item._id, e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-slate-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 sticky top-24">
                <h2 className="text-xl font-bold text-slate-50 mb-6">Order Summary</h2>
                
                <div className="space-y-3 text-slate-300 mb-6 border-b border-slate-700/50 pb-6">
                  <div className="flex justify-between">
                    <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-slate-50">Total:</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                    ${(subtotal + subtotal * 0.08).toFixed(2)}
                  </span>
                </div>
                
                <button 
                  disabled={cartItems.length === 0}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed To Checkout
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
