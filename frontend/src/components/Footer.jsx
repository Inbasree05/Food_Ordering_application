import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-1.5 rounded-full text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                <Utensils size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-50">FoodieExpress</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Delicious food delivered to your door in minutes. Fresh, fast, and always satisfying.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-50">Company</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-orange-500 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-orange-500 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-50">Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/faq" className="hover:text-orange-500 transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-orange-500 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-orange-500 transition-colors">Returns</Link></li>
              <li><Link to="/help" className="hover:text-orange-500 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-50">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="hover:text-orange-500 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} FoodieExpress. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
