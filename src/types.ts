/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  ingredients: string[];
  calories: number;
  size: 'S' | 'M' | 'L';
  image: string;
  isPopular?: boolean;
  isPromo?: boolean;
  discountPrice?: number;
  tags?: string[];
}

export interface CartItem {
  id: string; // Dynamic combination of product.id + sweetness + ice + toppings
  product: Product;
  quantity: number;
  sweetness: string; // e.g., "100%", "70%", "50%", "30%", "0%"
  ice: string; // e.g., "100%", "70%", "50%", "0%"
  size: 'S' | 'M' | 'L';
  toppings: string[]; // List of selected toppings
  notes?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  drinkName?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  discountPercent: number;
  bannerImage: string;
  color: string;
}
