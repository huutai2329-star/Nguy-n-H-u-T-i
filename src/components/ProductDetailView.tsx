/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, FormEvent } from 'react';
import { ArrowLeft, Plus, Minus, Star, Heart, Flame, ShieldAlert, ShoppingBag, CheckCircle, Send, MessageSquare } from 'lucide-react';
import { Product, CartItem, Review } from '../types';
import { SWEETNESS_LEVELS, ICE_LEVELS, TOPPINGS } from '../data';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  showToast: (message: string) => void;
}

export default function ProductDetailView({ product, onBack, onAddToCart, showToast }: ProductDetailViewProps) {
  // Configurator states
  const [size, setSize] = useState<'S' | 'M' | 'L'>('M');
  const [sweetness, setSweetness] = useState('100% Đường');
  const [ice, setIce] = useState('100% Đá');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Local interactive product reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'r_detail_1',
      userName: 'Trần Thế Anh',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
      date: '2026-06-02',
      comment: `Thức uống này vô cùng thích hợp cho những ngày nắng nóng. Mình uống ngọt vừa nên chọn 50% đường thấy cực thanh tao. Sẽ mua lại nhiều lần.`,
    },
    {
      id: 'r_detail_2',
      userName: 'Lê Kiều Mỹ',
      userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 4,
      date: '2026-06-03',
      comment: `Trình bày sạch sẽ chu đáo, nước giữ được độ lạnh mọng nguyên bản. Thêm trân châu hoàng kim giòn dai nhai sướng miệng.`,
    }
  ]);

  // Review Form States
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewError, setReviewError] = useState('');

  // Size adjustment calculation: S reduce by 5000, M base, L add 10000
  const sizeAdjustment = useMemo(() => {
    if (size === 'S') return -5000;
    if (size === 'L') return 10000;
    return 0;
  }, [size]);

  // Topping cost calculation
  const toppingsPrice = useMemo(() => {
    return selectedToppings.reduce((acc, name) => {
      const topping = TOPPINGS.find(t => t.name === name);
      return acc + (topping ? topping.price : 0);
    }, 0);
  }, [selectedToppings]);

  // Live Unit Price & Total Price computation
  const basePrice = product.discountPrice || product.price;
  const unitPrice = basePrice + sizeAdjustment + toppingsPrice;
  const totalPrice = unitPrice * quantity;

  const handleToppingToggle = (name: string) => {
    setSelectedToppings(prev =>
      prev.includes(name)
        ? prev.filter(t => t !== name)
        : [...prev, name]
    );
  };

  const handleIncreaseQty = () => setQuantity(q => q + 1);
  const handleDecreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const handleAddToCartSubmit = () => {
    const cartItemId = `${product.id}-${size}-${sweetness.replace(/\s+/g, '')}-${ice.replace(/\s+/g, '')}-${selectedToppings.sort().join('')}`;
    
    const cartItem: CartItem = {
      id: cartItemId,
      product,
      quantity,
      sweetness,
      ice,
      size,
      toppings: [...selectedToppings],
      notes: notes.trim() || undefined
    };

    onAddToCart(cartItem);
    showToast(`Đã thêm ${quantity} ly ${product.name} vào giỏ hàng! 🍹`);
  };

  const handleReviewFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setReviewError('');

    if (!newReviewName.trim() || !newReviewComment.trim()) {
      setReviewError('Vui lòng điền đầy đủ họ tên và nội dung đánh giá.');
      return;
    }

    const reviewObj: Review = {
      id: `r_custom_${Date.now()}`,
      userName: newReviewName.trim(),
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80', // Beautiful default avatar
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment.trim()
    };

    setReviews(prev => [reviewObj, ...prev]);
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    showToast('Cảm ơn bạn đã gửi đánh giá thực tế hữu ích! ❤️');
  };

  return (
    <div id="product-detail-view" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100 font-sans text-left">
      <div className="max-w-6xl mx-auto">
        
        {/* Back navigation button */}
        <button
          id="detail-back-btn"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 py-2 px-4 bg-white hover:bg-slate-100 text-slate-700 shadow-xs border border-slate-100 rounded-full transition-all text-xs font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Thực Đơn</span>
        </button>

        {/* Master Details Panel */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Product Image */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.isPopular && (
                <div className="absolute top-4 left-4 bg-amber-400 text-slate-900 py-1 px-3 rounded-full text-xs font-black uppercase tracking-wide shadow-md">
                  ⭐ Bán Chạy Nhất
                </div>
              )}
            </div>

            {/* Health and Nutrition parameters cards */}
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/60 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600">
                  <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 uppercase font-semibold">Năng Lượng</span>
                  <strong className="text-slate-800 text-sm">{product.calories} Calories</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600">
                  <span className="text-lg">🌿</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400 uppercase font-semibold">Chế Biến</span>
                  <strong className="text-slate-800 text-sm">Ép Lạnh Tự Nhiên</strong>
                </div>
              </div>
            </div>

            {/* Detailed ingredients list */}
            <div className="space-y-2">
              <h4 className="text-xs text-slate-400 uppercase tracking-widest font-black">🌱 Thành Phần Nguyên Bản</h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="py-1 px-3 bg-slate-100 text-slate-600 text-xs rounded-lg border border-slate-200/50 font-medium">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Drink Configurator forms */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">{product.category}</span>
              <h1 id="detail-drink-name" className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-500 mr-0.5" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-300 text-xs">|</span>
                <span className="text-xs text-slate-400 font-medium">{product.reviewCount} lượt đặt trước</span>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed border-b border-slate-100 pb-5">
              {product.description}
            </p>

            {/* Step 1: Cup Size Selection */}
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-black uppercase tracking-wider">1. CHỌN KÍCH CỠ LY (SIZE)</span>
                <span className="text-[11px] text-emerald-600 font-semibold">(S: -5.000đ | M: Chuẩn | L: +10.000đ)</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(['S', 'M', 'L'] as const).map((currSize) => (
                  <button
                    key={currSize}
                    id={`size-btn-${currSize}`}
                    onClick={() => setSize(currSize)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border cursor-pointer ${
                      size === currSize
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    Size {currSize}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sweetness percentage Selection */}
            <div className="space-y-3 text-left">
              <span className="block text-xs text-slate-400 font-black uppercase tracking-wider">2. MỨC ĐỘ NGỌT (ĐƯỜNG)</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {SWEETNESS_LEVELS.map((level) => (
                  <button
                    key={level}
                    id={`sweet-btn-${level.replace(/\s+/g, '')}`}
                    onClick={() => setSweetness(level)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer truncate ${
                      sweetness === level
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                    title={level}
                  >
                    {level.split(' ')[0]} {/* display "100%", "70%", etc. */}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Ice cooling level selection */}
            <div className="space-y-3 text-left">
              <span className="block text-xs text-slate-400 font-black uppercase tracking-wider">3. MỨC ĐỘ LẠNH (ĐÁ)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ICE_LEVELS.map((level) => (
                  <button
                    key={level}
                    id={`ice-btn-${level.replace(/\s+/g, '')}`}
                    onClick={() => setIce(level)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer truncate ${
                      ice === level
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                    title={level}
                  >
                    {level.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Toppings multi-selection (Thêm Topping tùy thích) */}
            <div className="space-y-3 text-left">
              <span className="block text-xs text-slate-400 font-black uppercase tracking-wider">
                4. THÊM TOPPING CAO CẤP QUYẾN RŨ (Tùy chọn)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {TOPPINGS.map((topping) => {
                  const isChecked = selectedToppings.includes(topping.name);
                  return (
                    <button
                      key={topping.name}
                      id={`topping-item-${topping.name.replace(/\s+/g, '')}`}
                      onClick={() => handleToppingToggle(topping.name)}
                      className={`flex justify-between items-center p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-500 text-emerald-800'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                        }`}>
                          {isChecked && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>
                        <span>{topping.name}</span>
                      </div>
                      <span className="text-xs text-emerald-600 font-black">+{(topping.price).toLocaleString('vi-VN')}đ</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Notes */}
            <div className="space-y-2 text-left">
              <label htmlFor="drink-notes" className="block text-xs text-slate-400 font-black uppercase tracking-wider">
                5. GHI CHÚ ĐẶC BIỆT CHO PHA CHẾ (ví dụ: Ít béo, nhiều thạch...)
              </label>
              <input
                id="drink-notes"
                type="text"
                placeholder="Ghi chú pha chế riêng..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 py-2.5 px-4 text-xs sm:text-sm rounded-xl border border-slate-200 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Counter and pricing trigger section */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-150 space-y-4">
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Số lượng ly:</span>
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-1.5 shadow-5xs">
                  <button
                    onClick={handleDecreaseQty}
                    className="p-1 text-slate-500 hover:text-rose-500 hover:bg-slate-100 rounded-md transition-colors"
                    title="Giảm số lượng"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-black text-slate-800 text-base w-6 text-center">{quantity}</span>
                  <button
                    onClick={handleIncreaseQty}
                    className="p-1 text-slate-500 hover:text-emerald-500 hover:bg-slate-100 rounded-md transition-colors"
                    title="Tăng số lượng"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total money preview block */}
              <div className="flex justify-between items-end border-t border-slate-200/60 pt-4">
                <div>
                  <span className="block text-[11px] text-slate-400 font-medium uppercase">Đơn giá ly: {unitPrice.toLocaleString('vi-VN')}đ</span>
                  <span className="block text-slate-500 text-xs font-bold font-display mt-0.5">XÁC NHẬN TỔNG TIỀN:</span>
                </div>
                <strong className="text-slate-900 font-sans font-black text-xl sm:text-2xl tracking-tight">
                  {totalPrice.toLocaleString('vi-VN')} VNĐ
                </strong>
              </div>

              {/* Action buttons */}
              <div className="pt-2">
                <button
                  id="add-to-cart-action-btn"
                  onClick={handleAddToCartSubmit}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-emerald-100 hover:scale-101 active:scale-99 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Mua ngay - Thêm vào Giỏ hàng</span>
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Live Client Reviews for this drink */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left side Reviews list */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-extrabold text-xl text-slate-800">Khách hàng nhận xét ({reviews.length})</h3>
              </div>

              <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto pr-2 space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover rounded-full border border-slate-100 shrink-0"
                        />
                        <div>
                          <span className="block font-display font-bold text-slate-800 text-xs sm:text-sm">{rev.userName}</span>
                          <div className="flex text-amber-400 mt-0.5">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono font-medium">{rev.date}</span>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-2.5 pl-1 italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side form block for client writing an instant review */}
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-100/70 h-fit">
              <h3 className="font-display font-bold text-slate-800 text-base mb-4 text-left">✍️ Để lại cảm xúc thực tế của bạn</h3>
              
              <form onSubmit={handleReviewFormSubmit} className="space-y-4">
                {reviewError && (
                  <p className="text-xs text-rose-500 font-semibold bg-rose-50 p-2 rounded-lg border border-rose-100">
                    {reviewError}
                  </p>
                )}

                <div className="space-y-1.5 text-left">
                  <label htmlFor="review-name" className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Họ và tên của bạn</label>
                  <input
                    id="review-name"
                    type="text"
                    placeholder="ví dụ: Nguyễn Hoàng Nam..."
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="w-full bg-white text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Đánh giá điểm tinh tế (sao)</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 focus:outline-none cursor-pointer"
                        title={`${star} Sao`}
                      >
                        <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="review-comment" className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nội dung bình luận ẩm thực</label>
                  <textarea
                    id="review-comment"
                    rows={3}
                    placeholder="Hương vị nước giải khát ở đây có làm khỏe mát tức thì không? Lát trái cây tươi ngon như mong muốn chứ?..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-white text-xs sm:text-sm py-2 px-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi nhận xét ngay</span>
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
