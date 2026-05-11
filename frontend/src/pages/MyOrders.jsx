import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loader2, Package, ChevronRight, Clock, CheckCircle2, Truck, UtensilsCrossed } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user || !user.token) return;
        
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Placed': return <Package className="text-blue-500" size={20} />;
      case 'Preparing': return <UtensilsCrossed className="text-amber-500" size={20} />;
      case 'Out for Delivery': return <Truck className="text-orange-500" size={20} />;
      case 'Delivered': return <CheckCircle2 className="text-green-500" size={20} />;
      default: return <Clock className="text-slate-500" size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-50">My <span className="text-orange-500">Orders</span></h1>
          <p className="text-slate-500 mt-2">Track and manage your recent orders</p>
        </div>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700/50">
            <Package className="mx-auto text-slate-700 mb-4" size={64} />
            <h3 className="text-xl font-bold text-slate-300">No orders yet</h3>
            <p className="text-slate-500 mt-2 mb-8">Looks like you haven't ordered anything yet.</p>
            <Link to="/menu" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all">
              Go to Menu
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden hover:border-slate-600 transition-all shadow-xl">
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-900 p-3 rounded-xl text-orange-500 border border-slate-700">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <p className="text-slate-50 font-bold text-lg">Order #{order._id.slice(-6).toUpperCase()}</p>
                        <p className="text-slate-500 text-xs">{new Date(order.createdAt).toLocaleDateString()} • {order.orderItems.length} Items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20 animate-pulse'
                      }`}>
                        {order.status}
                      </div>
                      <Link 
                        to={`/order/${order._id}/track`}
                        className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-slate-50 px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                      >
                        Track <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>

                  <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="shrink-0 flex items-center gap-3 bg-slate-900/50 pr-4 rounded-xl border border-slate-700/30">
                        <img src={item.image} className="w-12 h-12 rounded-l-xl object-cover" alt="" />
                        <span className="text-slate-300 text-xs font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-700/50 flex justify-between items-center">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Amount</p>
                    <p className="text-xl font-black text-slate-50">${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyOrders;
