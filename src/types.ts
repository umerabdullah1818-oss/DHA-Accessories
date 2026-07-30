export type CategoryId =
  | 'mobile-covers'
  | 'earphones'
  | 'chargers'
  | 'data-cables'
  | 'power-banks'
  | 'smart-watches'
  | 'screen-protectors'
  | 'phone-holders'
  | 'bluetooth-speakers';

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  description: string;
  itemCount: number;
  image: string;
  gradient: string;
}

export interface Review {
  id: string;
  userName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  avatar?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: CategoryId;
  categoryName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  specifications: ProductSpecification[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  brand: string;
  warranty: string;
  tags: string[];
  active?: boolean;
  storagePath?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  whatsappNumber: string;
  email?: string;
  address: string;
  city: string;
  postalCode?: string;
  notes?: string;
  paymentMethod: 'cod' | 'bank_transfer';
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';
  createdAt: string;
}

export type OrderStatus = Order['status'];

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export type PageView =
  | 'home'
  | 'shop'
  | 'category'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'about'
  | 'contact'
  | 'faq'
  | 'wishlist'
  | 'admin'
  | 'policy';

export interface FilterOptions {
  category: CategoryId | 'all';
  priceRange: [number, number];
  brand: string;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'latest' | 'price-low' | 'price-high' | 'rating';
}
