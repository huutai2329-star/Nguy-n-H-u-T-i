/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, Menu, X, PhoneCall } from 'lucide-react';
import { useState } from 'react';
import { CartItem } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  cart: CartItem[];
}

export default function Navbar({ currentView, setView, setSelectedProductId, cart }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: 'Trang Chủ', view: 'home' },
    { label: 'Sản Phẩm', view: 'products' },
    { label: 'Giỏ Hàng', view: 'cart' },
    { label: 'Liên Hệ', view: 'contact' },
  ];

  const handleNavClick = (view: string) => {
    setView(view);
    setSelectedProductId(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav id="app-navbar" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo brand */}
          <div className="flex items-center">
            <button
              id="navbar-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="h-11 w-11 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform duration-200">
                🍹
              </div>
              <div className="text-left">
                <span className="block font-display text-xl font-bold tracking-tight text-slate-800 group-hover:text-emerald-600 transition-colors duration-200">
                  FRESH<span className="text-emerald-500 font-extrabold">DRINK</span>
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-400">
                  Store & Juice Bar
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-link-${item.view}`}
                  onClick={() => handleNavClick(item.view)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-inner'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Utilities (Cart & Contact Hotline) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold bg-slate-50 py-2 px-3 rounded-full border border-slate-100">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>Hotline: <strong className="text-slate-700">1900 8888</strong></span>
            </div>

            <button
              id="navbar-cart-trigger"
              onClick={() => handleNavClick('cart')}
              className="relative p-2.5 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 transition-all duration-200 cursor-pointer group"
              title="Xem giỏ hàng"
            >
              <ShoppingBag className="w-5.5 h-5.5 group-hover:scale-105 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu and cart trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="navbar-mobile-cart-btn"
              onClick={() => handleNavClick('cart')}
              className="relative p-2 rounded-full bg-slate-100 text-slate-700"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              id="navbar-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-white border-b border-slate-100 divide-y divide-slate-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  id={`nav-mobile-${item.view}`}
                  onClick={() => handleNavClick(item.view)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium ${
                    isActive
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="p-4 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              <span>Giao hàng tận nơi: <strong>1900 8888</strong></span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
