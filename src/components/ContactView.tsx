/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, User, RefreshCw, Smartphone } from 'lucide-react';

interface ContactViewProps {
  showToast: (message: string) => void;
}

export default function ContactView({ showToast }: ContactViewProps) {
  // Input fields state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Góp ý dịch vụ & Chất lượng đồ uống');
  const [message, setMessage] = useState('');

  // Validations messages state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form submission handler
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const tempErrors: { [key: string]: string } = {};

    // 1. Full name validation
    if (!fullName.trim()) {
      tempErrors.fullName = 'Họ và tên bắt buộc phải cung cấp.';
    } else if (fullName.trim().length < 5) {
      tempErrors.fullName = 'Họ tên phải dài tối thiểu 5 ký tự để thuận bối cảnh xưng hô.';
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      tempErrors.email = 'Thư điện tử (Email) không được bỏ trống.';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Định dạng Email không chính xác (vd: name@example.com).';
    }

    // 3. Vietnamese phone validation
    const vnPhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phone) {
      tempErrors.phone = 'Số điện thoại liên hệ là bắt buộc.';
    } else if (!vnPhoneRegex.test(phone)) {
      tempErrors.phone = 'Định dạng số di động Việt Nam chưa đúng (ví dụ: 0987654321).';
    }

    // 4. Message content validation
    if (!message.trim()) {
      tempErrors.message = 'Nội dung phản hồi không được để trống.';
    } else if (message.trim().length < 15) {
      tempErrors.message = 'Nội dung phản hồi quá ngắn. Vui lòng cụ thể hóa vấn đề từ 15 ký tự trở lên.';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      showToast('Có lỗi xảy ra. Hãy kiểm tra các hướng dẫn lỗi màu đỏ! ⚠️');
      return;
    }

    // Pass verification
    setErrors({});
    setIsSubmitted(true);
    showToast('Cảm ơn bạn! Góp ý của bạn đã được chuyển tới ban quản lý cửa hàng.');
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setSubject('Góp ý dịch vụ & Chất lượng đồ uống');
    setMessage('');
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <section id="contact-page-section" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-100 font-sans text-left">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-emerald-600 font-extrabold uppercase tracking-widest text-xs">GET IN TOUCH</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2">Góp Ý & Liên Hệ Fresh Drink</h1>
          <div className="h-1.5 w-16 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-500 text-sm mt-3">
            Chúng tôi luôn lắng nghe mọi phản hồi của quý đối tác và khách hàng để nâng cấp chất lượng phục vụ ngày một thanh nhã và tối tân hơn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Column Left: Contact Details and Map view */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Cards of coordinates */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-150 space-y-6">
              <h2 className="font-display font-bold text-slate-800 text-lg border-b border-slate-100 pb-3">
                THÔNG TIN CHI TIẾT CỬA HÀNG
              </h2>

              <div className="space-y-5">
                
                <div id="contact-info-address" className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px] uppercase tracking-wider font-bold">Địa chỉ trụ sở</span>
                    <p className="text-slate-800 text-sm mt-1 leading-relaxed">
                      123 Đường Ba Tháng Hai, Phường 11, Quận 10, Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                <div id="contact-info-hotline" className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                    <Phone className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px] uppercase tracking-wider font-bold">Hotline & Chăm sóc</span>
                    <p className="text-slate-800 text-sm mt-1">1900 8888 (Tất cả các ngày trong tuần)</p>
                    <p className="text-slate-500 text-xs mt-0.5">Nhánh 1: Giao hàng nhanh | Nhánh 2: Góp ý phản ánh</p>
                  </div>
                </div>

                <div id="contact-info-mail" className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px] uppercase tracking-wider font-bold">Thư điện tử</span>
                    <p className="text-slate-800 text-sm mt-1">lienhe@freshdrinkstore.vn</p>
                    <p className="text-slate-500 text-xs mt-0.5">Thời gian xử lý thư điện tử tiếp nhận: 08:30 - 17:30</p>
                  </div>
                </div>

                <div id="contact-info-hours" className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[11px] uppercase tracking-wider font-bold">Thời gian vận hành</span>
                    <p className="text-slate-800 text-sm mt-1">Hằng ngày: 08:00 - 22:30</p>
                    <p className="text-slate-500 text-xs mt-0.5">Vẫn phục vụ giao nước mát tốc hành trong các ngày lễ Tết.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive conceptual map mockup to replace expensive iframe */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-150 space-y-4">
              <span className="block text-slate-400 text-[10px] font-semibold uppercase tracking-widest">📍 BẢN ĐỒ KHU VỰC GIAO NƯỚC CO-OP</span>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center p-4">
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="text-center space-y-3 z-10">
                  <div className="h-10 w-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    🍹
                  </div>
                  <div>
                    <strong className="block text-xs sm:text-sm text-slate-800">Fresh Drink Store Bến Thành Co-op</strong>
                    <span className="block text-[11px] text-slate-500 mt-0.5">Bán kính giao nước miễn ship 5km khu vực Quận 1, 3, 10, Phú Nhuận</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Column Right: Interactive customer feedback form with validation */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-150">
              
              {!isSubmitted ? (
                /* Contact form */
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-2">
                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                    <h2 className="font-display font-bold text-slate-800 text-lg">Biểu Mẫu Góp Ý & Liên Hệ Hợp Tác</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name input */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-fullname" className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Họ và Tên của bạn</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          id="contact-fullname"
                          type="text"
                          placeholder="vd: Trần Hoàng Quân..."
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl outline-none text-xs sm:text-sm transition-all"
                        />
                      </div>
                      {errors.fullName && <p className="text-xs text-rose-500 font-bold mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Cellular inputs */}
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-phone" className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Số điện thoại liên lạc</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="vd: 0987654321..."
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl outline-none text-xs sm:text-sm transition-all"
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-rose-500 font-bold mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Mail Input */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-email" className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Địa chỉ Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="vd: quan.tran@gmail.com..."
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                        }}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl outline-none text-xs sm:text-sm transition-all"
                      />
                    </div>
                    {errors.email && <p className="text-xs text-rose-500 font-bold mt-1">{errors.email}</p>}
                  </div>

                  {/* Subject selector */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-subject" className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Chủ đề mong muốn liên hệ</label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl py-3 px-3 uppercase tracking-wide font-semibold text-xs text-slate-600 outline-none cursor-pointer"
                    >
                      <option value="Góp ý dịch vụ & Chất lượng đồ uống">Góp ý dịch vụ & Chất lượng đồ uống 🍹</option>
                      <option value="Liên hệ hợp tác nhượng quyền đại lý">Liên hệ nhượng quyền và Đại lý kinh doanh 🤝</option>
                      <option value="Liên hệ cung ứng nguồn nông sản Fresh">Liên hệ cung ứng nguồn rau sạch/trái cây tươi dào 🌽</option>
                      <option value="Đăng ký tuyển dụng nhân viên pha chế">Đăng ký tuyển dụng Pha Chế & Giao Hàng 🧑‍🍳</option>
                    </select>
                  </div>

                  {/* Message input */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-message" className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Nội dung chi tiết góp ý</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Hãy chi tiết hóa mong muốn của bạn ví dụ: Vị ngọt trà đào cam sả cần thơm sả nhẹ hơn chút hay đăng ký cung cấp hoa quả organic VietGAP tại Đà Lạt..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                      }}
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl py-3 px-4 resize-none outline-none text-xs sm:text-sm transition-all placeholder:text-slate-400"
                    ></textarea>
                    {errors.message && <p className="text-xs text-rose-500 font-bold mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit buttons */}
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-emerald-100 transition-all cursor-pointer flex justify-center items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi ý kiến phản hồi</span>
                  </button>

                </form>
              ) : (
                /* Success screen feedback form */
                <div id="contact-success-box" className="py-8 text-center space-y-6 animate-scaleIn">
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-xl sm:text-2xl text-emerald-600">Đã gửi liên hệ thành công!</h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed">
                      Thông tin phản ánh của bạn đã được chuyển thẳng tới bộ phận quản lý dịch vụ khách hàng Fresh Drink Store. Chúng tôi thường phản hồi thông qua email phản hồi trong vòng 24 giờ.
                    </p>
                  </div>

                  {/* Captured data preview for reassurance */}
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 text-slate-700 text-xs sm:text-sm space-y-2 max-w-sm mx-auto text-left border border-slate-100">
                    <p>🧑‍💻 <strong>Họ tên:</strong> {fullName}</p>
                    <p>📱 <strong>Điện thoại:</strong> {phone}</p>
                    <p>✉️ <strong>Email:</strong> {email}</p>
                    <p>🏷️ <strong>Chủ đề:</strong> {subject}</p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleResetForm}
                      className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Viết góp ý mới</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
