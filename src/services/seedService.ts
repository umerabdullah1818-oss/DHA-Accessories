import { writeBatch, doc, getDocs, collection } from 'firebase/firestore';
import { db, isFirebaseConfigured, handleFirestoreError, OperationType } from '../lib/firebase';
import { INITIAL_PRODUCTS } from '../data/products';
import { Product } from '../types';

export interface SeedResult {
  success: boolean;
  totalProducts: number;
  migratedCount: number;
  message: string;
}

/**
 * Safely seeds all 91 products from INITIAL_PRODUCTS into Cloud Firestore.
 * Uses `writeBatch` with `doc(db, 'products', product.id)` and `{ merge: true }`
 * to guarantee upsert behaviour and prevent duplicate records if executed multiple times.
 */
export async function seedProductsToFirestore(): Promise<SeedResult> {
  if (!isFirebaseConfigured || !db) {
    return {
      success: false,
      totalProducts: INITIAL_PRODUCTS.length,
      migratedCount: 0,
      message: 'Firebase is not initialized or configured.',
    };
  }

  const path = 'products';
  const now = new Date().toISOString();

  try {
    const chunkSize = 400; // Firestore limits write batches to 500 operations
    let count = 0;

    for (let i = 0; i < INITIAL_PRODUCTS.length; i += chunkSize) {
      const chunk = INITIAL_PRODUCTS.slice(i, i + chunkSize);
      const batch = writeBatch(db);

      for (const product of chunk) {
        const docRef = doc(db, path, product.id);
        const productPayload: Product = {
          ...product,
          createdAt: product.createdAt || now,
          updatedAt: now,
        };
        batch.set(docRef, productPayload, { merge: true });
        count++;
      }

      await batch.commit();
    }

    return {
      success: true,
      totalProducts: INITIAL_PRODUCTS.length,
      migratedCount: count,
      message: `Successfully seeded/upserted ${count} products into Firestore 'products' collection.`,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Checks how many products currently exist in the Firestore 'products' collection.
 */
export async function getFirestoreProductsCount(): Promise<number> {
  if (!isFirebaseConfigured || !db) return 0;
  const path = 'products';
  try {
    const snapshot = await getDocs(collection(db, path));
    return snapshot.size;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
