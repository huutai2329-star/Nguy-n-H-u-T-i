/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingBag, ChevronRight, CheckCircle, Smartphone, MapPin, Sparkles, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ProductsView from './components/ProductsView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import ContactView from './components/ContactView';
import { CartItem, Product } from './types';
import { PRODUCTS } from './data';

export default function App() {
  // Page Navigation State
  const [currentView, setView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('Tất cả');

  // Interactive local Cart persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('fresh_drink_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error('Lỗi phân tích giỏ hàng hỏng:', e);
        return [];
      }
    }
    return [];
  });

  // Dynamic Toast message feed
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('fresh_drink_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  };

  // Add customized drink to cart state
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + newItem.quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });

    // Auto navigate to cart so they see their changes
    setView('cart');
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick order handler directly focusing product configurator
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update item quantity
  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Discard item completely
  const handleRemoveItem = (itemId: string) => {
    const removedItem = cart.find(item => item.id === itemId);
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    if (removedItem) {
      showToast(`Đã xóa ly ${removedItem.product.name} khỏi giỏ hàng. 🗑️`);
    }
  };

  // Wipe cart completely
  const handleClearCart = () => {
    setCart([]);
    showToast('Đã xóa sạch tất cả sản phẩm trong giỏ hàng.');
  };

  // Look up focused product for details page
  const focusedProduct = selectedProductId ? PRODUCTS.find((p) => p.id === selectedProductId) : null;

  return (
    <div id="app-root-container" className="flex flex-col min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-500 selection:text-white font-sans antialiased">
      
      {/* Dynamic promo notification ticker header */}
      <div className="bg-slate-900 py-2.5 px-4 text-center text-xs text-white flex justify-center items-center gap-1.5 font-medium z-40 relative">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
        <span>✨ Giảm 15% mùa hè với mã CODE: <strong className="text-yellow-300 tracking-wider font-mono">FRESHSUMMER15</strong> (Miễn phí ship từ 150k) ✨</span>
      </div>

      {/* Primary header navbar */}
      <Navbar
        currentView={currentView}
        setView={setView}
        setSelectedProductId={setSelectedProductId}
        cart={cart}
      />

      {/* Main pages container */}
      <main className="flex-1 w-full bg-slate-50 relative">
        {focusedProduct ? (
          /* Route overrides showing Detail Configurator View */
          <ProductDetailView
            product={focusedProduct}
            onBack={() => setSelectedProductId(null)}
            onAddToCart={handleAddToCart}
            showToast={showToast}
          />
        ) : (
          /* Standard 4 major views router */
          <>
            {currentView === 'home' && (
              <HomeView
                setView={setView}
                setSelectedProductId={setSelectedProductId}
                onAddToCartQuick={(p) => handleSelectProduct(p.id)}
              />
            )}

            {currentView === 'products' && (
              <ProductsView
                onSelectProduct={handleSelectProduct}
                selectedCategoryId={selectedCategoryId}
                setSelectedCategoryId={setSelectedCategoryId}
              />
            )}

            {currentView === 'cart' && (
              <CartView
                cart={cart}
                onUpdateQty={handleUpdateQty}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                setView={setView}
                showToast={showToast}
              />
            )}

            {currentView === 'contact' && (
              <ContactView showToast={showToast} />
            )}
          </>
        )}
      </main>

      {/* Master footer block */}
      <Footer
        setView={setView}
        setSelectedProductId={setSelectedProductId}
      />

      {/* Micro Interactive Toast Alert Box */}
      {toastMessage && (
        <div
          id="toast-floating-container"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-800 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm border-l-4 border-l-emerald-500 animate-slideUp"
        >
          <div className="text-lg">🛎️</div>
          <p className="text-left text-xs sm:text-sm font-semibold flex-1 leading-snug">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
            title="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
