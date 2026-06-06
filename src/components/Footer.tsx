/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, MapPin, Phone, Clock, Instagram, Facebook, Youtube, Share2 } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
  setSelectedProductId: (id: string | null) => void;
}

export default function Footer({ setView, setSelectedProductId }: FooterProps) {
  const handleNavClick = (view: string) => {
    setView(view);
    setSelectedProductId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-slate-900 text-slate-400 font-sans border-t-4 border-emerald-500">
      {/* Top Footer Banner */}
      <div className="bg-emerald-600 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="font-display font-semibold text-xl sm:text-2xl">⚡ Giao nước siêu nhanh trong vòng 30 phút</h3>
            <p className="text-emerald-100 text-sm mt-1">Nước uống mát lạnh vẫn giữ nguyên hương vị thơm ngon tinh khiết.</p>
          </div>
          <button
            id="footer-action-order"
            onClick={() => handleNavClick('products')}
            className="px-6 py-3 bg-white text-emerald-700 font-bold rounded-full shadow-lg hover:bg-emerald-50 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
          >
            Đặt hàng ngay
          </button>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg font-bold">
              🍹
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              FRESH<span className="text-emerald-400">DRINK</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Hương vị tươi trẻ từ thiên nhiên. Chúng tôi luôn sử dụng các loại trái cây chín mọng tự nhiên trong ngày nhằm mang lại nguồn năng lượng thuần khiết và thanh mát cho cơ thể bạn.
          </p>
          
          <div className="flex gap-3 text-slate-400 pt-2">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-500 hover:text-white transition-colors" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-500 hover:text-white transition-colors" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-500 hover:text-white transition-colors" title="Youtube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-500 hover:text-white transition-colors" title="TikTok">
              <span className="text-xs font-semibold uppercase tracking-tight">Tk</span>
            </a>
          </div>
        </div>

        {/* Contact Links */}
        <div className="space-y-4">
          <h4 className="text-white font-display font-semibold text-base uppercase tracking-wider relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-emerald-500">
            Thông Tin Liên Hệ
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>123 Đường Ba Tháng Hai, Phường 11, Quận 10, TP. Hồ Chí Minh</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Hotline: 1900 8888</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>lienhe@freshdrinkstore.vn</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Mở cửa: 08:00 - 22:30 (Mỗi ngày)</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-display font-semibold text-base uppercase tracking-wider relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-emerald-500">
            Khám phá tiện ích
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => handleNavClick('home')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                Trang Chủ Store
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('products')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                Sản Phẩm Trà & Ép
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('cart')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                Kiểm tra Giỏ Hàng
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('contact')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                Gửi góp ý & Liên Hệ
              </button>
            </li>
          </ul>
        </div>

        {/* Policy Column */}
        <div className="space-y-4">
          <h4 className="text-white font-display font-semibold text-base uppercase tracking-wider relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-emerald-500">
            Chính Sách Cửa Hàng
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Chính sách bảo mật thanh toán</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Chính sách giao nhận & đổi trả</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Điều kiện và điều khoản dịch vụ</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Cam kết an toàn thực phẩm</a></li>
          </ul>
        </div>

      </div>

      {/* Copyright Disclaimer */}
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-sans">
        <p>© 2026 Fresh Drink Store. All rights reserved. Thiết kế với trọn trái tim và nước mát lành.</p>
      </div>
    </footer>
  );
}
