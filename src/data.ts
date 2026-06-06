/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review, Promotion } from './types';

export const CATEGORIES = [
  'Tất cả',
  'Trà Trái Cây',
  'Nước Ép Nguyên Chất',
  'Trà Sữa Thượng Hạng',
  'Sinh Tố & Đá Xay'
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Trà Đào Cam Sả Đặc Biệt',
    category: 'Trà Trái Cây',
    price: 49000,
    rating: 4.8,
    reviewCount: 142,
    description: 'Sự kết hợp hoàn hảo giữa vị trà thanh mát, thơm lừng của đào chín, cam tươi mọng nước và hương sả nồng nàn đặc trưng. Đem lại cảm giác s sảng khoái tức thì.',
    ingredients: ['Trà lài thượng hạng', 'Siro đào tự nhiên', 'Cam vàng chín mọng', 'Sả tươi nguyên cây', 'Đào miếng giòn rụm'],
    calories: 180,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    isPromo: true,
    discountPrice: 39000,
    tags: ['Best Seller', 'Thanh mát']
  },
  {
    id: 'p2',
    name: 'Trà Dâu Tây Atiso Đỏ',
    category: 'Trà Trái Cây',
    price: 45000,
    rating: 4.7,
    reviewCount: 96,
    description: 'Vị chua thanh mát của hoa Hibiscus (Atiso Đỏ) hòa quyện cùng vị ngọt lịm của dâu tây Đà Lạt chín mọng, tạo nên một thức uống bổ dưỡng và cực kỳ bắt mắt.',
    ingredients: ['Hoa hibiscus sấy khô', 'Dâu tây Đà Lạt tươi', 'Mật ong nguyên chất', 'Hạt chia dồi dào chất xơ'],
    calories: 150,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    tags: ['Giàu Vitamin', 'Đẹp da']
  },
  {
    id: 'p3',
    name: 'Trà Trái Cây Nhiệt Đới Hạt Chia',
    category: 'Trà Trái Cây',
    price: 52000,
    rating: 4.9,
    reviewCount: 204,
    description: 'Ly trà rực rỡ sắc màu nhiệt đới với đầy ắp các loại trái cây tươi ngon: chanh dây, dưa hấu, dứa, táo, cam xen lẫn hạt chia giòn sần sật bồi bổ năng lượng.',
    ingredients: ['Trà ô long nhè nhẹ', 'Chanh dây tươi', 'Dứa chín cắt hạt lựu', 'Táo xanh giòn', 'Dưa hấu đỏ', 'Hạt chia hữu cơ'],
    calories: 210,
    size: 'L',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    tags: ['Xinh dáng', 'Năng lượng']
  },
  {
    id: 'p4',
    name: 'Trà Vải Lài Thạch Nha Đam',
    category: 'Trà Trái Cây',
    price: 45000,
    rating: 4.6,
    reviewCount: 88,
    description: 'Vị ngọt thanh nho nhã của trái vải tươi quyện cùng hương hoa lài thơm dịu phảng phất, kết hợp topping nha đam giòn giòn mát lạnh nhai cực đã.',
    ingredients: ['Trà hoa nhài thanh tao', 'Quả vải chín tươi', 'Thạch nha đam tự nấu', 'Lá bạc hà trang trí'],
    calories: 165,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    isPromo: true,
    discountPrice: 38000,
    tags: ['Thơm mát', 'Khuyến mãi']
  },
  {
    id: 'p5',
    name: 'Nước Ép Cam Vàng Nguyên Chất',
    category: 'Nước Ép Nguyên Chất',
    price: 42000,
    rating: 4.8,
    reviewCount: 110,
    description: '100% sử dụng những quả cam Úc nhập khẩu chín mọng ngọt nước, được ép trực tiếp bằng phương pháp ép lạnh giữ trọn vẹn vitamin C thiết yếu cho cả ngày.',
    ingredients: ['Cam vàng Úc vắt tay', 'Nước cốt chanh nhẹ', 'Chút xíu đường mật mía siêu sạch'],
    calories: 120,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    tags: ['100% Tự nhiên', 'Cực nhiều Vitamin']
  },
  {
    id: 'p6',
    name: 'Nước Ép Dưa Hấu Bạc Hà',
    category: 'Nước Ép Nguyên Chất',
    price: 39000,
    rating: 4.5,
    reviewCount: 75,
    description: 'Hương vị dưa hấu ngọt lịm mọng nước kết hợp cùng vài lá bạc hà tươi giã nhẹ, giải tỏa ngay lập tức những cơn nắng nóng gay gắt của mùa hè.',
    ingredients: ['Dưa hấu Long An chín đỏ', 'Lá bạc hà hữu cơ vắt tinh dầu', 'Chanh tươi chống oxy hóa'],
    calories: 110,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
    tags: ['Giải nhiệt', 'Ít calo']
  },
  {
    id: 'p7',
    name: 'Nước Ép Táo Xanh Cần Tây Detox',
    category: 'Nước Ép Nguyên Chất',
    price: 49000,
    rating: 4.7,
    reviewCount: 130,
    description: 'Sự lựa chọn vàng cho lối sống lành mạnh. Sự kết hợp giữa táo xanh chua thanh, cần tây giàu xơ, dưa chuột mát lành giúp thanh lọc cơ thể cực tốt.',
    ingredients: ['Táo xanh Phan Rang', 'Cần tây Đà Lạt tươi sạch', 'Dưa chuột hữu cơ', 'Nước cốt chanh xanh'],
    calories: 90,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587caa9a?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    tags: ['Detox', 'Giảm cân']
  },
  {
    id: 'p8',
    name: 'Nước Ép Thơm Chanh Dây Mật Ong',
    category: 'Nước Ép Nguyên Chất',
    price: 42000,
    rating: 4.6,
    reviewCount: 64,
    description: 'Thức uống rực rỡ kích thích vị giác cực mạnh với vị chua của chanh dây quả, thơm của dứa chín sẫm và vị ngọt hậu quyến rũ khó cưỡng từ mật ong rừng nguyên chất.',
    ingredients: ['Dứa chín ngọt lịm', 'Chanh dây ruột vàng', 'Mật ong hoa nhãn nguyên chất'],
    calories: 140,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1578314196403-149edbc79e60?auto=format&fit=crop&w=600&q=80',
    tags: ['Chua ngọt', 'Đề kháng']
  },
  {
    id: 'p9',
    name: 'Trà Sữa Trân Châu Hoàng Kim',
    category: 'Trà Sữa Thượng Hạng',
    price: 45000,
    rating: 4.9,
    reviewCount: 320,
    description: 'Thức uống huyền thoại làm từ cốt hồng trà đậm vị thơm béo đậm đà kết hợp cùng trân châu hoàng kim dẻo dai bùi béo ngọt ngào tẩm mật ong thơm lừng.',
    ingredients: ['Hồng trà Assam Thượng Hạng', 'Sữa béo thực vật cao cấp', 'Trân châu hoàng kim tự làm', 'Đường đen organic'],
    calories: 340,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    tags: ['Bán chạy nhất', 'Vị ngon béo']
  },
  {
    id: 'p10',
    name: 'Trà Sữa Matcha Đậu Đỏ Nhật Bản',
    category: 'Trà Sữa Thượng Hạng',
    price: 48000,
    rating: 4.8,
    reviewCount: 156,
    description: 'Bột trà xanh Uji Matcha tinh khiết nhập khẩu từ Kyoto thơm nồng, chát nhẹ đặc trưng hòa với sữa tươi béo ngậy cùng đậu đỏ ngào đường mềm mịn ngọt dịu.',
    ingredients: ['Cốt bột Uji Matcha Nhật', 'Sữa tươi nguyên kem', 'Đậu đỏ Azuki ngào đường', 'Kem mặn macchiato nhẹ'],
    calories: 290,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    tags: ['Matcha Nhật', 'Độc đáo']
  },
  {
    id: 'p11',
    name: 'Trà Sữa Ô Long Thạch Sương Sáo',
    category: 'Trà Sữa Thượng Hạng',
    price: 45000,
    rating: 4.7,
    reviewCount: 112,
    description: 'Trà sữa nấu từ trà Ô Long Cao Sơn Đài Loan hun khói tạo nên nốt hương thanh lịch nhẹ nhàng, kết hợp cùng thạch sương sáo mướt mịn cực giải nhiệt.',
    ingredients: ['Trà Ô Long Cao Sơn', 'Sữa tươi thanh trùng', 'Thạch sương sáo thảo mộc tự nhiên'],
    calories: 260,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80',
    isPromo: true,
    discountPrice: 35000,
    tags: ['Ít béo', 'Hương ô long']
  },
  {
    id: 'p12',
    name: 'Sinh Tố Xoài Dừa Nhiệt Đới',
    category: 'Sinh Tố & Đá Xay',
    price: 55000,
    rating: 4.8,
    reviewCount: 178,
    description: 'Một ly sinh tố đậm đặc sắc vàng nhiệt đới từ cơm xoài chín cát Hòa Lộc thơm dẻo quánh xay cùng nước cốt dừa hữu cơ siêu béo và sữa chua.',
    ingredients: ['Xoài cát Hòa Lộc chín', 'Nước cốt dừa sánh béo', 'Sữa chua men sống', 'Vụn dừa nướng giòn rụm rắc trên'],
    calories: 280,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    isPopular: true,
    tags: ['Béo ngậy', 'Đặc sản xoài']
  },
  {
    id: 'p13',
    name: 'Sinh Tố Bơ Sáp Dừa Non Sữa Béo',
    category: 'Sinh Tố & Đá Xay',
    price: 59000,
    rating: 4.7,
    reviewCount: 145,
    description: 'Bơ sáp Đắk Lắk dẻo mịn bùi ngậy không xơ được tuyển chọn tỉ mỉ, xay quyện cùng cơm dừa non mềm ngọt ngọt béo béo cùng sữa đặc thơm nồng nàn.',
    ingredients: ['Bơ sáp 034 dẻo', 'Cơm dừa non xắt miếng', 'Sữa tươi nguyên chất', 'Sữa đặc Ông Thọ'],
    calories: 320,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1540348563464-902047ed6901?auto=format&fit=crop&w=600&q=80',
    tags: ['Siêu bổ dưỡng', 'Bơ sáp thơm']
  },
  {
    id: 'p14',
    name: 'Sinh Tố Berry Việt Quất Dâu Tây',
    category: 'Sinh Tố & Đá Xay',
    price: 58000,
    rating: 4.9,
    reviewCount: 190,
    description: 'Thức uống bổ béo chứa hàng loạt các chất chống oxy hóa từ tổ hợp việt quất đen, dâu tây đỏ và mâm xôi tây hòa lẫn sữa chua Hy Lạp sánh mịn.',
    ingredients: ['Quả việt quất tươi nhập khẩu', 'Dâu tây đỏ Đà Lạt', 'Sữa chua Hy Lạp ít đường', 'Hạt chia dồi dào dinh dưỡng'],
    calories: 195,
    size: 'M',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
    isPromo: true,
    discountPrice: 48000,
    tags: ['Chống Oxy hóa', 'Đẹp dáng']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Nguyễn Thị Minh Thư',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    date: '2026-05-20',
    comment: 'Trà đào sả ở đây rất thơm đậm vị trà không bị ngọt khé cổ như những nơi khác, lát đào rất giòn sần sật. Giao hàng nhanh lắm, đá vẫn chưa tan hết!',
    drinkName: 'Trà Đào Cam Sả Đặc Biệt'
  },
  {
    id: 'r2',
    userName: 'Trần Hoàng Long',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    date: '2026-05-25',
    comment: 'Nước ép táo cần tây detox cực kỳ dễ uống, do có táo xanh chua chua thanh thanh át bớt mùi nồng của cần tây. Mua combo uống hằng ngày rất tiện cho sức khỏe.',
    drinkName: 'Nước Ép Táo Xanh Cần Tây Detox'
  },
  {
    id: 'r3',
    userName: 'Phạm Thanh Thảo',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    date: '2026-06-01',
    comment: 'Fan nghiện trà sữa trân châu hoàng kim bơi hết vào đây. Vị béo mịn ngậy mùi trà sữa xịn chứ không phải vị hóa chất đâu nha, trân châu cực dẻo thơm dã man!',
    drinkName: 'Trà Sữa Trân Châu Hoàng Kim'
  },
  {
    id: 'r4',
    userName: 'Lê Minh Quân',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 4,
    date: '2026-06-04',
    comment: 'Sinh tố xoài dừa béo kinh khủng khiếp, mùi xoài thơm chín lịm cùng ngậy dừa béo. Bạn nào muốn tăng cân thì uống cái này bao chuẩn luôn nha.',
    drinkName: 'Sinh Tố Xoài Dừa Nhiệt Đới'
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo1',
    title: 'Siêu Khuyến Mãi Mùa Hè',
    description: 'Giảm ngay 15% tổng hóa đơn cho đơn hàng từ 150.000đ trở lên. Chào đón hè rực lửa cực sảng khoái!',
    code: 'FRESHSUMMER15',
    discountPercent: 15,
    bannerImage: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=80',
    color: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'promo2',
    title: 'Giải Nhiệt Trưa Hè',
    description: 'Giảm trực tiếp 10% cho tất cả các loại trà trái cây tươi dồi dào vitamin từ 11:00 đến 14:00.',
    code: 'MIDDEAL10',
    discountPercent: 10,
    bannerImage: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=1200&q=80',
    color: 'from-orange-400 to-red-600'
  },
  {
    id: 'promo3',
    title: 'Thành Viên Mới Tinh tươm',
    description: 'Đăng ký lần đầu và hưởng trọn vẹn ưu đãi chào sân lên đến 20% cho ly nước thơm ngon đầu tiên!',
    code: 'WELCOME20',
    discountPercent: 20,
    bannerImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    color: 'from-blue-500 to-indigo-700'
  }
];

export const TOPPINGS = [
  { name: 'Trân châu hoàng kim', price: 8000 },
  { name: 'Thạch sương sáo', price: 6000 },
  { name: 'Thạch nha đam giòn', price: 7000 },
  { name: 'Đào miếng giòn', price: 10000 },
  { name: 'Kem Macchiato mặn', price: 12000 },
  { name: 'Hạt chia hữu cơ', price: 5000 }
];

export const SWEETNESS_LEVELS = ['100% Đường', '70% Đường', '50% Đường', '30% Đường', 'Không Đường'];
export const ICE_LEVELS = ['100% Đá', '70% Đá', '50% Đá', 'Không Đá (Làm lạnh sẵn)'];
