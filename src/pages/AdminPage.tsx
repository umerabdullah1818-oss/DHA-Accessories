import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, OrderStatus } from '../types';
import { CATEGORIES } from '../data/categories';
import {
  auth,
  isFirebaseConfigured,
} from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  MessageSquare,
  ShieldCheck,
  LogOut,
  Upload,
  Eye,
  EyeOff,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    allProducts,
    orders,
    contactMessages,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductActive,
    updateOrderStatus,
    formatPrice,
    showToast,
  } = useStore();

  // Firebase Auth State
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Admin UI State
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'messages'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Form state for creating/editing products
  const [formData, setFormData] = useState({
    name: '',
    categoryId: 'mobile-covers',
    price: 999,
    originalPrice: 1499,
    image: '',
    description: '',
    brand: 'Jadugar',
    warranty: '7-Day Replacement',
    stockCount: 30,
    active: true,
    isFlashSale: false,
    isBestSeller: false,
    isFeatured: true,
    isNew: true,
    tags: 'mobile,accessories',
  });

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // List of authorized admin email addresses
  const AUTHORIZED_ADMIN_EMAILS = [
    'gillquratulainqadeer@gmail.com',
    'admin@jadugaraccessories.pk',
    'admin@jadugar.pk',
    'sales@jadugaraccessories.pk',
  ];

  // Auth state listener with admin authorization guard
  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.email) {
        const userEmailLower = currentUser.email.toLowerCase();
        const isAuthorized = AUTHORIZED_ADMIN_EMAILS.some(
          (adminEmail) => adminEmail.toLowerCase() === userEmailLower
        );

        if (!isAuthorized) {
          await signOut(auth);
          setUser(null);
          setAuthError(
            `Access Denied: The account "${currentUser.email}" is not authorized to access the Jadugar Accessories Admin Portal. Confidential store access is restricted to approved administrators only.`
          );
          setAuthLoading(false);
          return;
        }
      }
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    setAuthError(null);
    setAuthLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      showToast('Signed in with Google Admin credentials!', 'success');
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setAuthError('Google Sign-In failed: ' + (err.message || String(err)));
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    if (!email || !password) {
      setAuthError('Please enter both an email address and password.');
      return;
    }
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (isSigningUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        showToast('Admin account created & authenticated!', 'success');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        showToast('Admin authenticated successfully!', 'success');
      }
    } catch (err: any) {
      console.error('Auth Error:', err);
      if (err.code === 'auth/operation-not-allowed' || err.code === 'auth/admin-restricted-operation') {
        setAuthError(
          'Email/Password provider is not enabled in Firebase Console for this project. Use "Sign in with Google" above, or enable Email/Password under Firebase Console > Authentication > Sign-in method.'
        );
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setAuthError('Invalid email or password. If this is your first time logging in, click "Initialize First Admin Account" below.');
      } else if (err.code === 'auth/email-already-in-use') {
        setAuthError('An account with this email already exists. Click "Sign In" below to log in.');
      } else {
        setAuthError(err.message || 'Authentication failed');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    showToast('Signed out of Admin Session', 'info');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const lowStockCount = allProducts.filter((p) => p.stockCount <= 10).length;
  const activeProductsCount = allProducts.filter((p) => p.active !== false).length;

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setSelectedImageFile(null);
    setImagePreview(null);
    setModalError(null);
    setFormData({
      name: '',
      categoryId: 'mobile-covers',
      price: 999,
      originalPrice: 1499,
      image: '',
      description: 'High-quality mobile accessory item by Jadugar Accessories.',
      brand: 'Jadugar',
      warranty: '7-Day Replacement Warranty',
      stockCount: 25,
      active: true,
      isFlashSale: false,
      isBestSeller: false,
      isFeatured: true,
      isNew: true,
      tags: 'mobile,gadget,jadugar',
    });
    setIsAddProductModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setSelectedImageFile(null);
    setImagePreview(p.image || null);
    setModalError(null);
    setFormData({
      name: p.name,
      categoryId: p.categoryId,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      image: p.image || '',
      description: p.description || '',
      brand: p.brand || 'Jadugar',
      warranty: p.warranty || '7-Day Replacement',
      stockCount: p.stockCount,
      active: p.active !== false,
      isFlashSale: p.isFlashSale || false,
      isBestSeller: p.isBestSeller || false,
      isFeatured: p.isFeatured || false,
      isNew: p.isNew || false,
      tags: (p.tags || []).join(', '),
    });
    setIsAddProductModalOpen(true);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setModalError('Product name is required');
      showToast('Product name is required', 'error');
      return;
    }
    if (formData.price <= 0) {
      setModalError('Price must be greater than Rs. 0');
      showToast('Price must be greater than Rs. 0', 'error');
      return;
    }
    if (formData.stockCount < 0) {
      setModalError('Stock quantity cannot be negative');
      showToast('Stock quantity cannot be negative', 'error');
      return;
    }
    if (!editingProduct && !selectedImageFile && !formData.image.trim()) {
      setModalError('Please upload a product image file or provide an image URL');
      showToast('Please upload a product image file or provide an image URL', 'error');
      return;
    }

    setIsSubmitting(true);
    setModalError(null);
    const selectedCat = CATEGORIES.find((c) => c.id === formData.categoryId);

    try {
      if (editingProduct) {
        await updateProduct(
          editingProduct.id,
          {
            name: formData.name.trim(),
            categoryId: formData.categoryId as any,
            categoryName: selectedCat?.name || 'Accessories',
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            description: formData.description.trim(),
            brand: formData.brand.trim(),
            warranty: formData.warranty.trim(),
            stockCount: Number(formData.stockCount),
            inStock: Number(formData.stockCount) > 0,
            active: formData.active,
            isFlashSale: formData.isFlashSale,
            isBestSeller: formData.isBestSeller,
            isFeatured: formData.isFeatured,
            isNew: formData.isNew,
            tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
            storagePath: editingProduct.storagePath,
          },
          selectedImageFile || undefined
        );
      } else {
        await addProduct(
          {
            name: formData.name.trim(),
            categoryId: formData.categoryId as any,
            categoryName: selectedCat?.name || 'Accessories',
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            image: formData.image || 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80',
            galleryImages: [],
            rating: 5.0,
            reviewCount: 1,
            description: formData.description.trim(),
            specifications: [
              { label: 'Brand', value: formData.brand },
              { label: 'Warranty', value: formData.warranty },
            ],
            inStock: Number(formData.stockCount) > 0,
            stockCount: Number(formData.stockCount),
            brand: formData.brand.trim(),
            warranty: formData.warranty.trim(),
            active: formData.active,
            isFeatured: formData.isFeatured,
            isBestSeller: formData.isBestSeller,
            isFlashSale: formData.isFlashSale,
            isNew: formData.isNew,
            tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
          },
          selectedImageFile || undefined
        );
      }
      setIsAddProductModalOpen(false);
    } catch (error: any) {
      console.error('Error saving product:', error);
      let msg = error?.message || 'Failed to save product. Please try again.';
      try {
        const parsed = JSON.parse(msg);
        if (parsed?.error) {
          msg = `Database Error: ${parsed.error}`;
        }
      } catch {
        // Not JSON formatted error
      }
      setModalError(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(productSearch.toLowerCase()));
    const matchesCat = selectedCategoryFilter === 'all' || p.categoryId === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // RENDER: Admin Authentication Guard
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-28">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">Admin Authentication</h1>
            <p className="text-xs text-slate-400">
              Sign in with Firebase Admin credentials to access live Firestore catalog and storage controls.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-400">
              {authError}
            </div>
          )}

          <div className="space-y-4 text-xs">
            {/* 1-Click Google Sign In (Pre-configured for AI Studio Firebase) */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={authLoading}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google Account</span>
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Or Email Authentication</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  placeholder="admin@jadugar.pk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-3 rounded-xl text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>{isSigningUp ? 'Create & Sign In Admin' : 'Sign In with Email & Password'}</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSigningUp(!isSigningUp)}
                  className="text-[11px] text-emerald-400 hover:underline font-bold block w-full"
                >
                  {isSigningUp ? 'Already have an admin account? Switch to Sign In' : 'First time? Click to Create New Admin Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Main Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 py-10 pt-28 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Live Firebase Admin Control Panel
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-mono">
                {user.email}
              </span>
            </div>
            <h1 className="text-3xl font-black text-white mt-1">Jadugar Accessories Admin</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-black px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>

            <button
              onClick={handleLogout}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-4 py-3 rounded-2xl text-xs flex items-center gap-2 font-bold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Analytics Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold">Total Orders Revenue</p>
              <p className="text-xl font-black text-white">{formatPrice(totalRevenue)}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold">Total Orders</p>
              <p className="text-xl font-black text-white">{orders.length} ({pendingOrdersCount} Pending)</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold">Firestore Catalog</p>
              <p className="text-xl font-black text-white">{allProducts.length} ({activeProductsCount} Active)</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-bold">Low Stock Warning</p>
              <p className="text-xl font-black text-rose-400">{lowStockCount} Products</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'products' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Catalog ({allProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders Management ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'messages' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Customer Messages ({contactMessages.length})</span>
          </button>
        </div>

        {/* Tab 1: Products Catalog CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:max-w-sm">
                <input
                  type="text"
                  placeholder="Search catalog by name or brand..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              </div>

              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full sm:w-auto bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Brand</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredProducts.map((p) => {
                    const isActive = p.active !== false;
                    return (
                      <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={p.image || 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'}
                            alt=""
                            className="w-10 h-10 object-cover rounded-xl border border-slate-800 bg-slate-950"
                          />
                          <div>
                            <p className="font-bold text-white line-clamp-1">{p.name}</p>
                            <div className="flex gap-2 items-center text-[10px]">
                              {p.isFlashSale && <span className="text-rose-400 font-bold">⚡ Flash</span>}
                              {p.storagePath && <span className="text-emerald-400 font-bold">☁️ Cloud Storage</span>}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-slate-400">{p.categoryName}</td>
                        <td className="p-3 text-blue-400 font-semibold">{p.brand}</td>
                        <td className="p-3 font-extrabold text-emerald-400">{formatPrice(p.price)}</td>
                        <td className="p-3">
                          <span className={`font-bold ${p.stockCount <= 10 ? 'text-rose-400' : 'text-slate-200'}`}>
                            {p.stockCount} units
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleProductActive(p.id, isActive)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-colors ${
                              isActive
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{isActive ? 'Public Active' : 'Hidden Inactive'}</span>
                          </button>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1.5 bg-slate-800 text-blue-400 rounded-lg hover:bg-slate-700"
                              title="Edit Product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id, p.storagePath)}
                              className="p-1.5 bg-slate-800 text-rose-400 rounded-lg hover:bg-slate-700"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-x-auto shadow-2xl">
            {orders.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-8">No orders received yet.</p>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 pb-3">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">City & Address</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-mono font-bold text-white">{order.id}</td>
                      <td className="p-3">
                        <p className="font-bold text-slate-200">{order.customerName}</p>
                        <p className="text-[10px] text-slate-400">{order.phoneNumber}</p>
                      </td>
                      <td className="p-3 text-slate-300 max-w-xs">
                        <span className="font-bold text-emerald-400">{order.city}</span> - {order.address}
                      </td>
                      <td className="p-3 text-slate-300">
                        {order.items.map((i, idx) => (
                          <div key={idx} className="text-[11px]">
                            • {i.name} (x{i.quantity})
                          </div>
                        ))}
                      </td>
                      <td className="p-3 font-extrabold text-white">{formatPrice(order.total)}</td>
                      <td className="p-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs font-bold text-slate-200 focus:outline-none"
                        >
                          <option value="pending">🟡 Pending</option>
                          <option value="confirmed">🔵 Confirmed</option>
                          <option value="dispatched">🟣 Dispatched</option>
                          <option value="delivered">🟢 Delivered</option>
                          <option value="cancelled">🔴 Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 3: Customer Messages */}
        {activeTab === 'messages' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            {contactMessages.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-8">No customer messages received.</p>
            ) : (
              <div className="space-y-3">
                {contactMessages.map((msg) => (
                  <div key={msg.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-white">
                      <span>{msg.name} ({msg.phone})</span>
                      <span className="text-emerald-400">{msg.email}</span>
                    </div>
                    <p className="text-slate-300">{msg.message}</p>
                    <p className="text-[10px] text-slate-500">{msg.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-base">
                {editingProduct ? 'Edit Product' : 'Add New Real Product'}
              </h3>
              <button onClick={() => setIsAddProductModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-bold">Error Publishing Product</p>
                  <p className="text-[11px] opacity-90">{modalError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Product Title / Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Jadugar GaN 65W Fast Charger"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Price in PKR *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Original Price (PKR)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              {/* Firebase Storage Image Upload */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
                <label className="block font-bold text-slate-300">
                  Product Image (Firebase Storage Upload)
                </label>
                
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-slate-800" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-900 border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Uploading a file will store it securely in Firebase Storage.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Or direct Image URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Warranty Details</label>
                <input
                  type="text"
                  value={formData.warranty}
                  onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  />
                  <span className="font-bold text-emerald-400">Publicly Active</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.isFlashSale}
                    onChange={(e) => setFormData({ ...formData, isFlashSale: e.target.checked })}
                  />
                  <span>Flash Sale Item</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  />
                  <span>Best Seller Tag</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span>Featured Home Section</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                <span>{editingProduct ? 'Save Changes' : 'Create & Publish Product'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
