/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, FormEvent } from 'react';
import { ShoppingBag, ShoppingCart, Plus, Minus, Trash2, ArrowRight, Ticket, CheckCircle2, ShoppingBagIcon } from 'lucide-react';
import { CartItem } from '../types';
import { TOPPINGS } from '../data';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQty: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  setView: (view: string) => void;
  showToast: (message: string) => void;
}

export default function CartView({ cart, onUpdateQty, onRemoveItem, onClearCart, setView, showToast }: CartViewProps) {
  // Coupon state
  const [promoCode, setPromoCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<number>(0); // discount percent
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Checkout Form states
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  
  // Checkout Outcome State
  const [orderSuccessDetails, setOrderSuccessDetails] = useState<{
    orderId: string;
    totalPaid: number;
    fullName: string;
    address: string;
    paymentMethod: string;
  } | null>(null);

  // 1. Calculate each item's total unit price & line subtotal
  const itemsWithPricing = useMemo(() => {
    return cart.map(item => {
      const basePrice = item.product.discountPrice || item.product.price;
      
      // size adjustment
      let sizePrice = 0;
      if (item.size === 'S') sizePrice = -5000;
      if (item.size === 'L') sizePrice = 10000;

      // topping sum
      const toppingsSum = item.toppings.reduce((acc, name) => {
        const tObj = TOPPINGS.find(t => t.name === name);
        return acc + (tObj ? tObj.price : 0);
      }, 0);

      const unitPrice = basePrice + sizePrice + toppingsSum;
      const rowSum = unitPrice * item.quantity;

      return {
        ...item,
        unitPrice,
        rowSum
      };
    });
  }, [cart]);

  // 2. Automated Financial invoice compilation
  const subtotal = useMemo(() => {
    return itemsWithPricing.reduce((acc, item) => acc + item.rowSum, 0);
  }, [itemsWithPricing]);

  // Flat-rate shipping 20.000đ, FREE shipping fee on orders over 150.000đ
  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 150000 ? 0 : 20000;
  }, [subtotal]);

  const discountAmount = useMemo(() => {
    return Math.floor((subtotal * activeDiscount) / 100);
  }, [subtotal, activeDiscount]);

  const totalBill = useMemo(() => {
    return subtotal + shippingFee - discountAmount;
  }, [subtotal, shippingFee, discountAmount]);

  // Coupon check logic
  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setCouponError('Vui lòng điền mã giảm giá.');
      return;
    }

    if (code === 'FRESHSUMMER15') {
      setActiveDiscount(15);
      setCouponSuccess('Áp dụng mã FRESHSUMMER15 thành công! Đã giảm 15% tổng giá trị món nước.');
      showToast('Áp dụng thành công mã giảm 15%! 🏷️');
    } else if (code === 'MIDDEAL10') {
      setActiveDiscount(10);
      setCouponSuccess('Áp dụng mã MIDDEAL10 thành công! Đã giảm 10% tổng giá trị món nước.');
      showToast('Áp dụng thành công mã giảm 10%! 🏷️');
    } else if (code === 'WELCOME20') {
      setActiveDiscount(20);
      setCouponSuccess('Áp dụng thành công mã WELCOME20 chào mừng thành viên mới giảm 20%!');
      showToast('Áp dụng thành công mã giảm 20%! 🏷️');
    } else {
      setCouponError('Mã giảm giá không hợp lệ hoặc đã hết hạn sử dụng.');
    }
  };

  // Form check submission logic
  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errors.fullName = 'Họ và tên không được để trống.';
    } else if (fullName.trim().length < 5) {
      errors.fullName = 'Họ tên phải dài tối thiểu 5 ký tự.';
    }

    const vnPhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneNumber) {
      errors.phoneNumber = 'Số điện thoại không được để trống.';
    } else if (!vnPhoneRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Số điện thoại Việt Nam chưa đúng định dạng (vd: 0912123456).';
    }

    if (!address.trim()) {
      errors.address = 'Địa chỉ nhận hàng bắt buộc phải cung cấp.';
    } else if (address.trim().length <= 10) {
      errors.address = 'Nhập địa chỉ chi tiết hơn để shipper giao nhanh (tối thiểu 10 ký tự).';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Vui lòng kiểm tra lại thông tin biểu mẫu giao vận! ⚠️');
      return;
    }

    // Success transaction simulated
    const randomOrderId = `FD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderSuccessDetails({
      orderId: randomOrderId,
      totalPaid: totalBill,
      fullName: fullName.trim(),
      address: address.trim(),
      paymentMethod: paymentMethod === 'COD' ? 'Thanh toán tiền mặt khi nhận hàng (COD)' : 
                     paymentMethod === 'Momo' ? 'Thanh toán trực tuyến Ví MoMo' : 'Chuyển khoản Ngân hàng (Internet Banking)'
    });

    onClearCart();
    setPromoCode('');
    setActiveDiscount(0);
    setFullName('');
    setPhoneNumber('');
    setAddress('');
    showToast('Đặt nước hoàn tất! Đơn hàng của bạn đang được pha chế.');
    window.scrollTo({ top: 30, behavior: 'smooth' });
  };

  // If order was successfully completed, show checkout screen
  if (orderSuccessDetails) {
    return (
      <div id="order-success-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 font-sans text-center">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-slate-100 space-y-8 animate-scaleIn">
          
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-emerald-600">Đặt hàng thành công!</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Cảm ơn bạn đã tin chọn Fresh Drink Store.</p>
          </div>

          <div className="bg-emerald-50/40 rounded-2xl p-6 border border-emerald-100/50 space-y-4 text-left">
            <div className="flex justify-between items-center pb-3 border-b border-emerald-100/30">
              <span className="text-xs text-slate-500 font-bold uppercase">Mã đơn hàng:</span>
              <strong className="text-slate-900 font-mono text-base">{orderSuccessDetails.orderId}</strong>
            </div>

            <div className="space-y-2 text-sm leading-relaxed text-slate-600">
              <p>📍 <strong>Người nhận:</strong> {orderSuccessDetails.fullName}</p>
              <p>🏠 <strong>Địa chỉ giao:</strong> {orderSuccessDetails.address}</p>
              <p>💳 <strong>Hình thức:</strong> {orderSuccessDetails.paymentMethod}</p>
              <p>🕙 <strong>Dự kiến:</strong> Nhận hàng sau 30 phút (Fresh Drink sẽ gọi điện xác thực)</p>
            </div>

            <div className="pt-3 border-t border-emerald-100/30 flex justify-between items-center text-slate-800">
              <span className="font-bold text-sm">Tổng thanh toán:</span>
              <strong className="text-emerald-700 font-sans font-black text-lg">
                {orderSuccessDetails.totalPaid.toLocaleString('vi-VN')}đ
              </strong>
            </div>
          </div>

          <button
            id="success-back-home-btn"
            onClick={() => { setOrderSuccessDetails(null); setView('home'); }}
            className="w-full sm:w-fit px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-100 transition-all cursor-pointer"
          >
            Quay lại trang chủ đặt mua thêm
          </button>

        </div>
      </div>
    );
  }

  return (
    <section id="shopping-cart-section" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100 font-sans text-left">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mb-8 flex items-center gap-2.5">
          <ShoppingBag className="w-7 h-7 text-emerald-500" />
          <span>Giỏ Hàng Của Bạn</span>
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Frame: List of Items in cart */}
            <div className="lg:col-span-8 space-y-4">
              
              {itemsWithPricing.map((item) => (
                <div
                  key={item.id}
                  id={`cartitem-${item.id}`}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-150 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
                >
                  
                  {/* Drink icon / Thumbnail img */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shrink-0 border border-slate-100"
                    />
                    
                    <div className="text-left space-y-1">
                      <span className="block text-[10px] text-emerald-500 font-extrabold uppercase bg-emerald-50 py-0.5 px-2 rounded-md w-fit">
                        Size {item.size}
                      </span>
                      
                      <h3 className="font-display font-bold text-slate-800 text-sm sm:text-base leading-tight">
                        {item.product.name}
                      </h3>
                      
                      {/* Configuration values */}
                      <span className="block text-slate-400 text-xs leading-relaxed">
                        {item.sweetness} · {item.ice} 
                        {item.toppings.length > 0 && (
                          <span className="text-emerald-600 font-bold block mt-0.5">
                            + Toppings: {item.toppings.join(', ')}
                          </span>
                        )}
                        {item.notes && (
                          <span className="text-amber-600 block pl-1 border-l-2 border-amber-300 italic text-[11px] mt-0.5">
                            Ghi chú: "{item.notes}"
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Action controls */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    
                    {/* Unit Row Money */}
                    <span className="block font-sans font-black text-slate-800 text-sm sm:text-base">
                      {item.rowSum.toLocaleString('vi-VN')}đ
                    </span>

                    <div className="flex items-center gap-4">
                      {/* Interactive Qty Controls */}
                      <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:text-rose-500 hover:bg-white rounded-md transition-colors"
                          title="Giảm 1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono font-bold text-xs text-slate-800 w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:text-emerald-500 hover:bg-white rounded-md transition-colors"
                          title="Tăng 1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Xóa món nước này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}

              {/* Direct reset/clear button */}
              <div className="flex justify-between items-center pt-2 px-1">
                <button
                  onClick={() => setView('products')}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
                >
                  ← Tiếp tục mua thêm ly khác
                </button>
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-slate-400 hover:text-rose-500 font-semibold"
                >
                  Xóa sạch giỏ hàng
                </button>
              </div>

            </div>

            {/* Right frame: Dynamic invoice calculation & Simulated checkout */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Dynamic Bill Card */}
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-150 space-y-4">
                <h2 className="font-display font-bold text-slate-800 text-base border-b border-slate-100 pb-3">
                  TỔNG HÓA ĐƠN CHI TIẾT
                </h2>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Tạm tính ly nước:</span>
                    <span className="font-medium">{subtotal.toLocaleString('vi-VN')}đ</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      Phí giao hàng siêu tốc:
                    </span>
                    <span className="font-medium">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 font-extrabold text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded-sm">Miễn phí ship</span>
                      ) : (
                        `${shippingFee.toLocaleString('vi-VN')}đ`
                      )}
                    </span>
                  </div>

                  {shippingFee > 0 && (
                    <p className="text-[10px] text-slate-400 italic text-left leading-normal">
                      💡 Mua thêm {(150000 - subtotal).toLocaleString('vi-VN')}đ để được MIỄN PHÍ vận chuyển!
                    </p>
                  )}

                  {activeDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                      <span>Giảm giá ({activeDiscount}%):</span>
                      <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                </div>

                {/* Sub-form coupon adding */}
                <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-slate-150-100 space-y-2 text-left">
                  <label htmlFor="coupon-input" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nhập mã giảm giá (Mã Ưu Đãi)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        id="coupon-input"
                        type="text"
                        placeholder="Mã vd: FRESHSUMMER15"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-9 pr-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Áp dụng
                    </button>
                  </div>
                  
                  {couponError && <p className="text-[10px] text-rose-500 font-semibold">{couponError}</p>}
                  {couponSuccess && <p className="text-[10px] text-emerald-600 font-semibold leading-normal">{couponSuccess}</p>}
                  <p className="text-[9px] text-slate-400 leading-normal">(* Gợi ý: Sao chép các mã FRESHSUMMER15, MIDDEAL10 hoặc WELCOME20 tại Trang chủ).</p>
                </form>

                {/* Bill complete sum row */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-slate-800">
                  <span className="font-bold text-sm sm:text-base">TỔNG CỘNG THANH TOÁN:</span>
                  <strong className="text-slate-900 font-sans font-black text-xl sm:text-2xl">
                    {totalBill.toLocaleString('vi-VN')}đ
                  </strong>
                </div>
              </div>

              {/* simulated checkout form */}
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-150 space-y-4">
                <h2 className="font-display font-bold text-slate-800 text-base border-b border-slate-100 pb-3">
                  THÔNG TIN GIAO HÀNG SIÊU TỐC
                </h2>

                <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                  
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="fullname-input" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Họ và Tên Người Nhận</label>
                    <input
                      id="fullname-input"
                      type="text"
                      placeholder="vd: Nguyễn Văn A..."
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (formErrors.fullName) setFormErrors(prev => ({ ...prev, fullName: '' }));
                      }}
                      className="w-full bg-slate-50 text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-emerald-500"
                    />
                    {formErrors.fullName && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.fullName}</p>}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="phone-input" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Số Điện Thoại</label>
                    <input
                      id="phone-input"
                      type="tel"
                      placeholder="vd: 0912345678..."
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (formErrors.phoneNumber) setFormErrors(prev => ({ ...prev, phoneNumber: '' }));
                      }}
                      className="w-full bg-slate-50 text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-emerald-500"
                    />
                    {formErrors.phoneNumber && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.phoneNumber}</p>}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="address-input" className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Địa Chỉ Giao Hàng</label>
                    <input
                      id="address-input"
                      type="text"
                      placeholder="Nhập số nhà, tên đường, phường, quận..."
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (formErrors.address) setFormErrors(prev => ({ ...prev, address: '' }));
                      }}
                      className="w-full bg-slate-50 text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-emerald-500"
                    />
                    {formErrors.address && <p className="text-[10px] text-rose-500 font-semibold">{formErrors.address}</p>}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest">Hình Thức Thanh Toán</span>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('COD')}
                        className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2 cursor-pointer ${
                          paymentMethod === 'COD'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          paymentMethod === 'COD' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                        }`}>
                          {paymentMethod === 'COD' && <div className="w-1 h-1 rounded-full bg-white"></div>}
                        </div>
                        <span>Thanh toán khi nhận hàng (COD)💵</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Momo')}
                        className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2 cursor-pointer ${
                          paymentMethod === 'Momo'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          paymentMethod === 'Momo' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                        }`}>
                          {paymentMethod === 'Momo' && <div className="w-1 h-1 rounded-full bg-white"></div>}
                        </div>
                        <span>Thanh toán bằng ví MoMo 🌸</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Bank')}
                        className={`p-3 rounded-xl text-xs font-semibold border flex items-center gap-2 cursor-pointer ${
                          paymentMethod === 'Bank'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                          paymentMethod === 'Bank' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                        }`}>
                          {paymentMethod === 'Bank' && <div className="w-1 h-1 rounded-full bg-white"></div>}
                        </div>
                        <span>Chuyển khoản Ngân hàng (Auto-QR) 🏦</span>
                      </button>

                    </div>
                  </div>

                  <button
                    type="submit"
                    id="checkout-confirm-btn"
                    className="w-full mt-4 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Gửi Đơn Đặt Nước</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>

              </div>

            </div>

          </div>
        ) : (
          /* Empty shopping bag screen */
          <div id="cart-empty-boundary" className="bg-white rounded-3xl p-16 text-center border border-dashed border-slate-200 max-w-2xl mx-auto">
            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="font-display font-extrabold text-xl text-slate-800">Giỏ hàng rỗng túi</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              Chưa có một món nước giải khát ngọt mát lành ngon lành nào bổ sung vào thực đơn của bạn. Let's explore right now!
            </p>
            <button
              onClick={() => setView('products')}
              className="mt-6 inline-flex items-center gap-1.5 py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-2xl transition-colors cursor-pointer shadow-md"
            >
              <span>Xem ngay Thực đơn 12+ Món nước giải khát</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
