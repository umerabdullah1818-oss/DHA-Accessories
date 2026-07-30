import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth, isFirebaseConfigured, handleFirestoreError, OperationType } from '../lib/firebase';
import { uploadProductImage, deleteProductImage } from './storageService';
import { Product, Order, ContactMessage } from '../types';

/**
 * Service Abstraction Layer for Firestore Operations
 * Decouples Firestore SDK calls from React UI components and state contexts.
 */

// --- PRODUCT SERVICES ---

/**
 * Fetch products from Firestore once.
 */
export async function fetchProductsFromFirestore(): Promise<Product[] | null> {
  if (!isFirebaseConfigured || !db) return null;
  const path = 'products';
  try {
    const snapshot = await getDocs(collection(db, path));
    const products: Product[] = [];
    snapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as Product);
    });
    return products;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Realtime listener for Firestore products collection.
 */
export function subscribeToProductsFromFirestore(
  onProductsUpdate: (products: Product[]) => void,
  onError?: (err: unknown) => void
): () => void {
  if (!isFirebaseConfigured || !db) {
    onProductsUpdate([]);
    return () => {};
  }

  const path = 'products';
  const unsubscribe = onSnapshot(
    collection(db, path),
    (snapshot) => {
      const products: Product[] = [];
      snapshot.forEach((docSnap) => {
        products.push({ id: docSnap.id, ...docSnap.data() } as Product);
      });
      onProductsUpdate(products);
    },
    (error) => {
      console.error('Firestore products subscription error:', error);
      if (onError) onError(error);
    }
  );

  return unsubscribe;
}

/**
 * Creates a new Product in Firestore with optional image file upload.
 */
export async function createProductInFirestore(
  productData: Omit<Product, 'id'>,
  imageFile?: File
): Promise<string | null> {
  if (!isFirebaseConfigured || !db) return null;
  const productId = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const path = `products/${productId}`;
  const now = new Date().toISOString();

  let imageUrl = productData.image;
  let storagePath = productData.storagePath;

  if (imageFile) {
    try {
      const uploadResult = await uploadProductImage(imageFile, productId);
      imageUrl = uploadResult.downloadUrl;
      storagePath = uploadResult.storagePath;
    } catch (storageErr: any) {
      console.error('Storage Upload Error in createProduct:', storageErr);
      throw new Error(`[Storage Upload Error]: ${storageErr?.message || String(storageErr)}`);
    }
  }

  try {
    const newProduct: Product = {
      ...productData,
      id: productId,
      image: imageUrl,
      storagePath,
      active: productData.active !== undefined ? productData.active : true,
      inStock: productData.stockCount > 0,
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(doc(db, 'products', productId), newProduct);
    return productId;
  } catch (error) {
    console.error('Firestore Database Write Error in createProduct:', error);
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Updates an existing product in Firestore, with optional new image upload.
 */
export async function updateProductInFirestore(
  productId: string,
  updates: Partial<Product>,
  newImageFile?: File
): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const path = `products/${productId}`;
  const now = new Date().toISOString();

  const payload: Partial<Product> = {
    ...updates,
    updatedAt: now,
  };

  if (updates.stockCount !== undefined) {
    payload.inStock = updates.stockCount > 0;
  }

  if (newImageFile) {
    try {
      const uploadResult = await uploadProductImage(newImageFile, productId);
      payload.image = uploadResult.downloadUrl;

      // Clean up old image if a storage path existed
      if (updates.storagePath) {
        await deleteProductImage(updates.storagePath);
      }
      payload.storagePath = uploadResult.storagePath;
    } catch (storageErr: any) {
      console.error('Storage Upload Error in updateProduct:', storageErr);
      throw new Error(`Image Upload Failed: ${storageErr?.message || String(storageErr)}`);
    }
  }

  try {
    await updateDoc(doc(db, 'products', productId), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Toggles product active / inactive status in Firestore.
 */
export async function toggleProductActiveStatus(productId: string, currentActive: boolean): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const path = `products/${productId}`;
  try {
    await updateDoc(doc(db, 'products', productId), {
      active: !currentActive,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Deletes a product from Firestore and cleans up its image from Firebase Storage if present.
 */
export async function deleteProductFromFirestore(productId: string, storagePath?: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const path = `products/${productId}`;
  try {
    await deleteDoc(doc(db, 'products', productId));

    if (storagePath) {
      await deleteProductImage(storagePath);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- ORDER SERVICES ---

export async function fetchOrdersFromFirestore(): Promise<Order[] | null> {
  if (!isFirebaseConfigured || !db || !auth?.currentUser) return null;
  const path = 'orders';
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const orders: Order[] = [];
    snapshot.forEach((docSnap) => {
      orders.push({ id: docSnap.id, ...docSnap.data() } as Order);
    });
    return orders;
  } catch (error) {
    console.warn('Could not fetch orders (admin auth required):', error);
    return null;
  }
}

export async function placeOrderInFirestore(order: Order): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const path = `orders/${order.id}`;
  try {
    await setDoc(doc(db, 'orders', order.id), order);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateOrderStatusInFirestore(orderId: string, status: Order['status']): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const path = `orders/${orderId}`;
  try {
    await updateDoc(doc(db, 'orders', orderId), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// --- CONTACT MESSAGE SERVICES ---

export async function saveContactMessageToFirestore(message: ContactMessage): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const path = `contact_messages/${message.id}`;
  try {
    await setDoc(doc(db, 'contact_messages', message.id), message);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function fetchContactMessagesFromFirestore(): Promise<ContactMessage[] | null> {
  if (!isFirebaseConfigured || !db || !auth?.currentUser) return null;
  const path = 'contact_messages';
  try {
    const q = query(collection(db, path), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    const messages: ContactMessage[] = [];
    snapshot.forEach((docSnap) => {
      messages.push({ id: docSnap.id, ...docSnap.data() } as ContactMessage);
    });
    return messages;
  } catch (error) {
    console.warn('Could not fetch contact messages (admin auth required):', error);
    return null;
  }
}

export async function markMessageReadInFirestore(messageId: string): Promise<void> {
  if (!isFirebaseConfigured || !db) return;
  const path = `contact_messages/${messageId}`;
  try {
    await updateDoc(doc(db, 'contact_messages', messageId), { read: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// --- SEED & MIGRATION SERVICES ---
export { seedProductsToFirestore, getFirestoreProductsCount } from './seedService';
