import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  ContactMessage,
  PageView,
  CategoryId,
  FilterOptions,
} from '../types';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  subscribeToProductsFromFirestore,
  createProductInFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
  toggleProductActiveStatus as toggleActiveInFirestore,
  placeOrderInFirestore,
  fetchOrdersFromFirestore,
  updateOrderStatusInFirestore,
  saveContactMessageToFirestore,
  fetchContactMessagesFromFirestore,
  markMessageReadInFirestore,
} from '../services/firebaseService';

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  products: Product[]; // Public active products for storefront
  allProducts: Product[]; // All products including inactive ones for admin
  loadingProducts: boolean;
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  compareList: string[];
  orders: Order[];
  contactMessages: ContactMessage[];
  activePage: PageView;
  selectedCategoryId: CategoryId | 'all';
  selectedProductId: string | null;
  selectedOrder: Order | null;
  filters: FilterOptions;
  isCartOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  isCompareModalOpen: boolean;
  isDarkMode: boolean;
  toasts: Toast[];

  // Actions
  setActivePage: (page: PageView, options?: { categoryId?: CategoryId; productId?: string; order?: Order }) => void;
  setSelectedCategoryId: (catId: CategoryId | 'all') => void;
  setSelectedProductId: (prodId: string | null) => void;
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCompareModalOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<Order>;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<Order>;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  formatPrice: (price: number) => string;

  // Admin Product & Operations Actions
  addProduct: (newProduct: Omit<Product, 'id'>, imageFile?: File) => Promise<string | null>;
  updateProduct: (productId: string, updates: Partial<Product>, newImageFile?: File) => Promise<void>;
  deleteProduct: (productId: string, storagePath?: string) => Promise<void>;
  toggleProductActive: (productId: string, currentActive: boolean) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  markMessageRead: (messageId: string) => void;
}

const defaultFilters: FilterOptions = {
  category: 'all',
  priceRange: [0, 15000],
  brand: 'all',
  inStockOnly: false,
  onSaleOnly: false,
  searchQuery: '',
  sortBy: 'featured',
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products from Firestore
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

  // Derive active products for storefront
  const products = allProducts.filter((p) => p.active !== false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('Mobile Accessories DHA_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('Mobile Accessories DHA_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('Mobile Accessories DHA_recent');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<string[]>([]);
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('Mobile Accessories DHA_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('Mobile Accessories DHA_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [activePage, setActivePageState] = useState<PageView>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | 'all'>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // 1. Subscribe to Firestore Products on Mount
  useEffect(() => {
    setLoadingProducts(true);
    const unsubscribe = subscribeToProductsFromFirestore((fetchedProducts) => {
      setAllProducts(fetchedProducts);
      setLoadingProducts(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Fetch Orders & Contact Messages when Admin Auth is active
  useEffect(() => {
    const fetchAdminData = async () => {
      const remoteOrders = await fetchOrdersFromFirestore();
      if (remoteOrders && remoteOrders.length > 0) {
        setOrders(remoteOrders);
      }
      const remoteMessages = await fetchContactMessagesFromFirestore();
      if (remoteMessages && remoteMessages.length > 0) {
        setContactMessages(remoteMessages);
      }
    };

    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchAdminData();
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // Sync transient user state to Local Storage
  useEffect(() => {
    localStorage.setItem('Mobile Accessories DHA_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('Mobile Accessories DHA_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('Mobile Accessories DHA_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setActivePage = (
    page: PageView,
    options?: { categoryId?: CategoryId; productId?: string; order?: Order }
  ) => {
    setActivePageState(page);
    if (options?.categoryId) {
      setSelectedCategoryId(options.categoryId);
      setFilters((prev) => ({ ...prev, category: options.categoryId! }));
    }
    if (options?.productId) {
      setSelectedProductId(options.productId);
      setRecentlyViewed((prev) => [options.productId!, ...prev.filter((id) => id !== options.productId)].slice(0, 10));
    }
    if (options?.order) {
      setSelectedOrder(options.order);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    if (product.stockCount <= 0 || product.inStock === false) {
      showToast(`Sorry, "${product.name.slice(0, 30)}" is currently out of stock!`, 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      const targetQty = currentQty + quantity;

      if (targetQty > product.stockCount) {
        showToast(`Cannot add more than available stock (${product.stockCount} units available)`, 'error');
        return prev;
      }

      showToast(`Added "${product.name.slice(0, 30)}..." to Cart!`, 'success');
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: targetQty } : item
        );
      }
      return [...prev, { product, quantity: targetQty, selectedColor }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const itemProduct = allProducts.find((p) => p.id === productId);
    if (itemProduct && quantity > itemProduct.stockCount) {
      showToast(`Cannot exceed available stock limit (${itemProduct.stockCount} units available)`, 'error');
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isSaved = prev.includes(productId);
      if (isSaved) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from compare list', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 4) {
          showToast('You can compare up to 4 products max.', 'error');
          return prev;
        }
        showToast('Added to compare list', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInCompare = (productId: string) => compareList.includes(productId);
  const clearCompare = () => setCompareList([]);

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const resetFilters = () => setFilters(defaultFilters);

  const placeOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `JAD-${randomNum}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    await placeOrderInFirestore(newOrder);
    clearCart();
    return newOrder;
  };

  const addContactMessage = async (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString(),
      read: false,
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    await saveContactMessageToFirestore(newMsg);
    showToast('Message sent! We will respond on WhatsApp shortly.', 'success');
  };

  const formatPrice = (price: number): string => {
    const num = Number(price);
    if (price === undefined || price === null || Number.isNaN(num)) {
      return 'Rs. 0';
    }
    return `Rs. ${num.toLocaleString('en-PK')}`;
  };

  // Admin Functions backed by Firestore & Storage
  const addProduct = async (newProduct: Omit<Product, 'id'>, imageFile?: File): Promise<string | null> => {
    try {
      const createdId = await createProductInFirestore(newProduct, imageFile);
      if (createdId) {
        showToast(`Added product "${newProduct.name}"`, 'success');
      }
      return createdId;
    } catch (err: any) {
      const msg = err?.message || 'Failed to add product to Firestore';
      showToast(msg, 'error');
      throw err;
    }
  };

  const updateProduct = async (productId: string, updates: Partial<Product>, newImageFile?: File): Promise<void> => {
    try {
      await updateProductInFirestore(productId, updates, newImageFile);
      showToast('Product updated successfully', 'success');
    } catch (err: any) {
      const msg = err?.message || 'Failed to update product';
      showToast(msg, 'error');
      throw err;
    }
  };

  const toggleProductActive = async (productId: string, currentActive: boolean): Promise<void> => {
    try {
      await toggleActiveInFirestore(productId, currentActive);
      showToast(`Product ${currentActive ? 'deactivated' : 'activated'}`, 'info');
    } catch (err) {
      showToast('Failed to toggle product active status', 'error');
    }
  };

  const deleteProduct = async (productId: string, storagePath?: string): Promise<void> => {
    try {
      await deleteProductFromFirestore(productId, storagePath);
      showToast('Product deleted from Firestore', 'info');
    } catch (err) {
      showToast('Failed to delete product', 'error');
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    await updateOrderStatusInFirestore(orderId, status);
    showToast(`Order ${orderId} status updated to ${status}`, 'success');
  };

  const markMessageRead = async (messageId: string) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, read: true } : m))
    );
    await markMessageReadInFirestore(messageId);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        allProducts,
        loadingProducts,
        cart,
        wishlist,
        recentlyViewed,
        compareList,
        orders,
        contactMessages,
        activePage,
        selectedCategoryId,
        selectedProductId,
        selectedOrder,
        filters,
        isCartOpen,
        isQuickViewOpen,
        quickViewProduct,
        isCompareModalOpen,
        isDarkMode,
        toasts,
        setActivePage,
        setSelectedCategoryId,
        setSelectedProductId,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        clearCompare,
        openQuickView,
        closeQuickView,
        setIsCartOpen,
        setIsCompareModalOpen,
        toggleDarkMode,
        setFilters,
        resetFilters,
        placeOrder,
        createOrder: placeOrder,
        addContactMessage,
        showToast,
        removeToast,
        formatPrice,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductActive,
        updateOrderStatus,
        markMessageRead,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
