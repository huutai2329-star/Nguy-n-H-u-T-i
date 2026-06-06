/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Heart, Award, ShieldCheck, Flame, ShoppingCart, ArrowRight, Quote } from 'lucide-react';
import { Product, Promotion, Review } from '../types';
import { PRODUCTS, PROMOTIONS, REVIEWS } from '../data';

interface HomeViewProps {
  setView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
  onAddToCartQuick: (product: Product) => void;
}

export default function HomeView({ setView, setSelectedProductId, onAddToCartQuick }: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Auto-change banners every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMOTIONS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % PROMOTIONS.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + PROMOTIONS.length) % PROMOTIONS.length);
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  // Curated prominent/popular items
  const popularProducts = PRODUCTS.filter(p => p.isPopular).slice(0, 4);

  return (
    <div id="home-view" className="font-sans overflow-x-hidden">
      
      {/* 1. Prometheus Banner Slider (Slide quảng cáo) */}
      <section id="banner-slider-section" className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full bg-slate-100 overflow-hidden">
        <AnimatePresence mode="wait">
          {PROMOTIONS.map((promo, index) => {
            if (index !== currentSlide) return null;
            return (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className={`absolute inset-0 bg-gradient-to-r ${promo.color} flex items-center justify-center`}
              >
                {/* Background image overlay with opacity */}
                <div className="absolute inset-0 mix-blend-overlay opacity-30">
                  <img
                    src={promo.bannerImage}
                    alt={promo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-white">
                  <div className="space-y-6 text-left">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full">
                      🔥 ƯU ĐÃI ĐỘC QUYỀN
                    </span>
                    <h1 id={`promo-slide-title-${promo.id}`} className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                      {promo.title}
                    </h1>
                    <p className="text-emerald-50 text-base sm:text-lg max-w-xl leading-relaxed">
                      {promo.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/20 py-2.5 px-4 rounded-xl">
                        <span className="text-xs text-emerald-100 uppercase font-bold">Mã CODE:</span>
                        <code className="text-yellow-300 font-mono font-bold tracking-wider">{promo.code}</code>
                      </div>
                      <button
                        onClick={() => handleCopyCode(promo.code)}
                        className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold rounded-xl transition-colors cursor-pointer text-sm shadow-md"
                      >
                        {copiedCode === promo.code ? 'Đã sao chép! ✓' : 'Sao chép mã'}
                      </button>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setView('products')}
                        className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-800 font-bold rounded-full shadow-lg transition-transform hover:scale-103 cursor-pointer"
                      >
                        <span>Đặt Nước Ngay</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:flex justify-end p-4">
                    <div className="relative w-80 h-80 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl p-2 bg-white/10 backdrop-blur-md">
                      <img
                        src={promo.bannerImage}
                        alt="Promo spotlight"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Manual Slideshow navigation */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md transition-all z-20 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md transition-all z-20 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicator circles */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {PROMOTIONS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. Store Introduction (Giới thiệu cửa hàng & Giá trị cốt lõi) */}
      <section id="introduction-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-emerald-100 rounded-full filter blur-2xl opacity-70 -z-10 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-orange-100 rounded-full filter blur-2xl opacity-70 -z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80"
                alt="Fresh fruit drinks creation"
                referrerPolicy="no-referrer"
                className="w-full h-[450px] object-cover rounded-3xl shadow-xl border-8 border-slate-50"
              />
              <div className="absolute top-6 right-6 bg-slate-900 text-white rounded-2xl py-3 px-5 shadow-lg flex items-center gap-3">
                <div className="text-3xl">🌿</div>
                <div>
                  <p className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Thương hiệu đạt chuẩn</p>
                  <p className="font-display font-bold text-sm">100% Sạch Tự Nhiên</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <span className="font-mono text-emerald-600 font-extrabold uppercase tracking-widest text-xs">ABOUT US — CHÚNG TÔI LÀ</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
                Hành Trình Mang Hương Vị Thanh Mát Thiên Nhiên Vào Từng Ly Nước
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Chào mừng bạn đến với <strong className="text-emerald-600">Fresh Drink Store</strong> - nơi khởi nguồn của những dòng nước ép tinh khiết và trà dâu thanh mát bật tung hứng khởi! Được thành lập với sứ mệnh mang đến lối sống lành mạnh, chúng tôi nói KHÔNG với chất tạo màu nhân tạo và chất bảo quản đường hóa học.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Từng quả cam vàng Úc, từng trái dâu ngọt lịm Đà Lạt hay lá trà ô long hữu cơ đều được thu hoạch thủ công vào ban sớm và chế biến trực tiếp thông qua công nghệ ép lạnh tối tân. Đảm bảo giữ trọn 99% dưỡng chất quý báu cùng mùi hương sống động nguyên bản.
              </p>

              {/* USP Core Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div id="usp-natural" className="bg-slate-50 rounded-2xl p-4 border border-slate-100/70 hover:shadow-md transition-shadow">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit mb-3">
                    <Heart className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-slate-800 text-sm">100% An Lành</h4>
                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">Nguồn nguyên liệu tươi hữu cơ đạt chuẩn VietGAP.</p>
                </div>

                <div id="usp-nutrition" className="bg-slate-50 rounded-2xl p-4 border border-slate-100/70 hover:shadow-md transition-shadow">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 w-fit mb-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-slate-800 text-sm">Giao Toàn Vẹn</h4>
                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">Đóng chai đóng ly giữ nhiệt kỹ lưỡng, nhanh 30p.</p>
                </div>

                <div id="usp-detox" className="bg-slate-50 rounded-2xl p-4 border border-slate-100/70 hover:shadow-md transition-shadow">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 w-fit mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-slate-800 text-sm">Vải Nhuyễn Lạnh</h4>
                  <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">Làm lạnh tự nhiên, ít đường đảm bảo giữ eo đẹp dáng.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Highlighted Promotions (Khuyến mãi nổi bật) */}
      <section id="featured-promo-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-emerald-600 font-extrabold uppercase tracking-widest text-xs">SPECIAL OFFERS</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 mt-2">Khuyến Mãi Nổi Bật Cho Bạn</h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-500 text-sm mt-3">Nhập các mã ưu đãi độc quyền bên dưới khi thanh toán để hưởng những ưu đãi giá siêu hời.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROMOTIONS.map((promo) => (
              <div
                key={promo.id}
                id={`promocard-${promo.id}`}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={promo.bannerImage}
                      alt={promo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 py-1.5 px-3 bg-red-500 text-white font-bold text-xs rounded-full shadow-md animate-bounce">
                      GIẢM {promo.discountPercent}%
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-slate-800 text-lg leading-snug">{promo.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">{promo.description}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <div className="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                    <div className="text-left">
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Copy Code</span>
                      <strong className="text-emerald-600 font-mono text-sm">{promo.code}</strong>
                    </div>
                    <button
                      onClick={() => handleCopyCode(promo.code)}
                      className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      {copiedCode === promo.code ? 'Đã lấy!' : 'Lấy ngay'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curated Popular Products (Sản phẩm nổi bật) */}
      <section id="popular-showcase-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div className="text-left">
              <span className="font-mono text-emerald-600 font-extrabold uppercase tracking-widest text-xs">BEST SELLERS</span>
              <h2 className="font-display font-extrabold text-3xl text-slate-900 mt-2">Món Bán Chạy / Nổi Bật Trong Tuần</h2>
              <div className="h-1.5 w-16 bg-emerald-500 mt-3 rounded-full"></div>
            </div>
            <button
              id="view-all-drinks-btn"
              onClick={() => { setView('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-1.5 hover:gap-2.5 text-emerald-600 font-bold hover:text-emerald-700 transition-all text-sm cursor-pointer border border-emerald-200 hover:border-emerald-500 py-2.5 px-5 rounded-full"
            >
              <span>Xem tất cả thực đơn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularProducts.map((drink) => {
              const hasDiscount = drink.isPromo && drink.discountPrice;
              return (
                <div
                  key={drink.id}
                  id={`popular-drink-card-${drink.id}`}
                  className="group bg-slate-50 hover:bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-100/80 flex flex-col hover:-translate-y-1.5 relative"
                >
                  {/* Decorative popular tag badge */}
                  <div className="absolute top-4 right-4 z-10 flex gap-1.5 flex-col items-end">
                    <span className="flex items-center gap-1 py-1 px-2.5 bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase rounded-full shadow-md">
                      <Flame className="w-3 h-3 fill-slate-900 text-slate-900 inline animate-bounce" />
                      Hot Item
                    </span>
                    {hasDiscount && (
                      <span className="py-1 px-2.5 bg-red-500 text-white text-[10px] font-extrabold uppercase rounded-full shadow-md">
                        Sale
                      </span>
                    )}
                  </div>

                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                    />
                    {/* Hover actions block overlay */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleProductClick(drink.id)}
                        className="p-3 bg-white hover:bg-emerald-50 text-slate-900 font-bold text-xs rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
                        title="Tùy chọn hương vị & Mua hàng"
                      >
                        Đặt Nước Tùy Chọn
                      </button>
                    </div>
                  </div>

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
                        onClick={() => handleProductClick(drink.id)}
                        className="block font-display font-bold text-slate-800 text-base md:text-[17px] group-hover:text-emerald-600 transition-colors duration-200 text-left line-clamp-1 w-full"
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
                            <span className="block font-sans font-black text-rose-500 text-[17px]">
                              {drink.discountPrice?.toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        ) : (
                          <span className="block font-sans font-black text-slate-800 text-[17px]">
                            {drink.price.toLocaleString('vi-VN')}đ
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleProductClick(drink.id)}
                        className="py-2 px-3 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white font-bold text-xs rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Chọn vị</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Customer Reviews (Đánh giá khách hàng) */}
      <section id="reviews-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-emerald-600 font-extrabold uppercase tracking-widest text-xs">TESTIMONIALS</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 mt-2">Cảm nhận từ khách hàng ruột</h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-500 text-sm mt-3">Sự hài lòng của khách hàng là động lực lớn nhất của Fresh Drink Store.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                id={`customer-review-${review.id}`}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100 relative group hover:shadow-lg transition-all"
              >
                <div className="absolute top-6 right-6 text-slate-200/70 group-hover:text-emerald-200 transition-colors">
                  <Quote className="w-12 h-12 rotate-180" />
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-full border-2 border-emerald-500 shadow-md shrink-0"
                  />
                  <div>
                    <h4 className="font-display font-bold text-slate-800 text-base">{review.userName}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex text-amber-400">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 font-mono">{review.date}</span>
                    </div>
                    {review.drinkName && (
                      <span className="inline-block mt-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Đã uống: {review.drinkName}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-6 italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
