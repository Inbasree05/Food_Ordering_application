import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import CheckoutSteps from '../components/CheckoutSteps';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    } else if (!user) {
      navigate('/login');
    }
  }, [navigate, shippingAddress, paymentMethod, user]);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = addDecimals(itemsPrice > 50 ? 0 : 5.99); // Free shipping over $50
  const taxPrice = addDecimals(Number((0.08 * itemsPrice).toFixed(2)));
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      setError(null);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        config
      );

      clearCart();
      // Normally we would redirect to the order details page here: `/order/${data._id}`
      // For now, we will just alert success and redirect home
      alert('Order Placed Successfully! Order ID: ' + data._id);
      navigate('/');
      
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <CheckoutSteps step1 step2 step3 step4 />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Order Details Left Side */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50">
              <h2 className="text-xl font-bold text-slate-50 mb-4 border-b border-slate-700 pb-3">Shipping</h2>
              <p className="text-slate-300">
                <strong className="text-slate-50">Address: </strong>
                {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50">
              <h2 className="text-xl font-bold text-slate-50 mb-4 border-b border-slate-700 pb-3">Payment Method</h2>
              <p className="text-slate-300">
                <strong className="text-slate-50">Method: </strong>
                {paymentMethod}
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50">
              <h2 className="text-xl font-bold text-slate-50 mb-4 border-b border-slate-700 pb-3">Order Items</h2>
              {cartItems.length === 0 ? (
                <p className="text-slate-400">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 border-b border-slate-700/50 pb-4 last:border-0 last:pb-0">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <Link to={`/food/${item.food}`} className="text-slate-50 font-bold hover:text-red-500 transition-colors">
                          {item.name}
                        </Link>
                      </div>
                      <div className="text-slate-300 font-medium">
                        {item.qty} x ${item.price.toFixed(2)} = <span className="text-red-500 font-bold">${(item.qty * item.price).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Order Summary Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700/50 sticky top-24">
              <h2 className="text-xl font-bold text-slate-50 mb-6 border-b border-slate-700 pb-3">Order Summary</h2>
              
              <div className="space-y-3 text-slate-300 mb-6 border-b border-slate-700/50 pb-6">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>${itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shippingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${taxPrice}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-slate-50">Total:</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  ${totalPrice}
                </span>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm text-center">
                  {error}
                </div>
              )}
              
              <button 
                type="button"
                disabled={cartItems.length === 0 || loading}
                onClick={placeOrderHandler}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Place Order'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
