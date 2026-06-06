/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, RotateCcw, Filter, Star, ShoppingCart, SlidersHorizontal, Flame } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data';

interface ProductsViewProps {
  onSelectProduct: (id: string) => void;
  selectedCategoryId: string;
  setSelectedCategoryId: (category: string) => void;
}

export default function ProductsView({ onSelectProduct, selectedCategoryId, setSelectedCategoryId }: ProductsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommend'); // recommend, price-asc, price-desc, rating-desc

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategoryId !== 'Tất cả') {
      result = result.filter(p => p.category === selectedCategoryId);
    }

    // Filter by Search Query (with Vietnamese search tolerance)
    if (searchQuery.trim() !== '') {
      const normalizedQuery = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      result = result.filter(p => {
        const normalizedName = p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedDesc = p.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedCat = p.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedName.includes(normalizedQuery) || 
               normalizedDesc.includes(normalizedQuery) ||
               normalizedCat.includes(normalizedQuery);
      });
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceB - priceA;
      });
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }
    // 'recommend' leaves popularity first
    return result;
  }, [selectedCategoryId, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategoryId('Tất cả');
    setSortBy('recommend');
  };

  return (
    <section id="products-catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner header of product list */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl py-12 px-8 text-white mb-12 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/10">
            <span className="text-[250px]">🍹</span>
          </div>
          <div className="relative z-10 max-w-2xl text-left space-y-2">
            <span className="text-emerald-100 text-xs font-bold uppercase tracking-widest bg-emerald-700/40 py-1.5 px-3 rounded-full">
              🥗 KHỎE ĐẸP TỰ NHIÊN
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight">Thực Đơn Giải Khát Của Fresh Drink</h1>
            <p className="text-emerald-50/90 text-sm leading-relaxed">
              Trà trái cây mát lạnh giòn dẻo nha đam, nước ép dưa hấu, sinh tố bơ đậm đặc ngậy béo. Tươi mát nguyên bản chất dinh dưỡng từ thiên nhiên tuyển lựa khắt khe mỗi sớm mai.
            </p>
          </div>
        </div>

        {/* Search, Filter, Sort Toolbox inside a Grid */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input bar */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                id="product-search-input"
                type="text"
                placeholder="Tìm trà đào sả, nước ép dâu tây, sinh tố bơ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-100 focus:bg-white text-sm rounded-2xl border border-transparent focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-200/60 rounded-full px-2 py-0.5"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Sorting trigger */}
            <div className="md:col-span-4 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider shrink-0">Sắp xếp:</span>
              <select
                id="product-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-100 border border-transparent hover:border-slate-300 py-2.5 px-3 rounded-2xl text-xs sm:text-sm text-slate-700 font-medium focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer"
              >
                <option value="recommend">Gợi ý hàng đầu ⭐</option>
                <option value="price-asc">Giá từ thấp đến cao ↗</option>
                <option value="price-desc">Giá từ cao đến thấp ↘</option>
                <option value="rating-desc">Đánh giá tốt nhất (4.8h+) 🌟</option>
              </select>
            </div>

            {/* Reset button */}
            <div className="md:col-span-2">
              <button
                id="product-reset-btn"
                onClick={handleResetFilters}
                className="w-full py-2.5 px-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 transition-colors text-xs font-bold cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại lọc</span>
              </button>
            </div>

          </div>

          {/* Quick Categories Filter row */}
          <div className="border-t border-slate-100 pt-5">
            <span className="block text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 text-left">
              📂 DANH MỤC THỰC ĐƠN
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategoryId === category;
                return (
                  <button
                    key={category}
                    id={`category-pill-${category.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setSelectedCategoryId(category)}
                    className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-800'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Counter of matches filtered */}
        <div className="mb-6 flex justify-between items-center px-2">
          <p className="text-slate-500 text-xs sm:text-sm">
            Hiển thị <strong className="text-emerald-600">{filteredProducts.length}</strong> thức uống tươi ngon.
          </p>
        </div>

        {/* Product Grid of at least 12 items */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((drink) => {
              const hasDiscount = drink.isPromo && drink.discountPrice;
              return (
                <div
                  key={drink.id}
                  id={`product-card-${drink.id}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between hover:-translate-y-1 relative"
                >
                  {/* Tags */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 items-end">
                    {drink.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`py-1 px-2.5 text-[9px] font-extrabold uppercase rounded-full shadow-md ${
                          tag === 'Best Seller' || tag === 'Bán chạy nhất'
                            ? 'bg-amber-400 text-slate-900'
                            : 'bg-emerald-500 text-white'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {drink.isPopular && !drink.tags?.includes('Best Seller') && (
                      <span className="py-1 px-2.5 bg-amber-400 text-slate-900 text-[9px] font-extrabold uppercase rounded-full shadow-md">
                        Hot
                      </span>
                    )}
                  </div>

                  {/* Thumbnail Image component */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => onSelectProduct(drink.id)}
                        className="py-2.5 px-5 bg-white text-slate-800 text-xs font-bold rounded-2xl shadow-xl transition-transform hover:scale-105 cursor-pointer"
                      >
                        Tùy Chỉnh Vị & Mua
                      </button>
                    </div>
                  </div>

                  {/* Drink Title & pricing */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span className="font-semibold uppercase tracking-wider">{drink.category}</span>
                        <span className="flex items-center font-bold text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5 inline" />
                          {drink.rating}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => onSelectProduct(drink.id)}
                        className="block font-display font-bold text-slate-800 text-base hover:text-emerald-600 transition-colors duration-200 text-left line-clamp-1 w-full"
                      >
                        {drink.name}
                      </button>
                      
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                        {drink.description}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                      <div>
                        {hasDiscount ? (
                          <div className="space-y-0.5">
                            <span className="block text-xs line-through text-slate-400 font-medium">
                              {drink.price.toLocaleString('vi-VN')}đ
                            </span>
                            <span className="block font-sans font-black text-rose-500 text-base sm:text-lg">
                              {drink.discountPrice?.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        ) : (
                          <span className="block font-sans font-black text-slate-800 text-base sm:text-lg">
                            {drink.price.toLocaleString('vi-VN')}đ
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => onSelectProduct(drink.id)}
                        className="py-2 px-3 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white font-bold text-xs rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Mua</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty search fallbacks */
          <div id="no-products-fallback" className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
            <span className="text-5xl">🍹</span>
            <h3 className="font-display font-bold text-lg text-slate-800 mt-4">Không tìm thấy thức uống phù hợp</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Vui lòng thay đổi từ khóa tìm kiếm hoặc bấm nút Reset để tải lại bộ lọc.</p>
            <button
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-1.5 py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Quay lại tất cả sản phẩm</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
