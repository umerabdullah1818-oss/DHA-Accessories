import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, isFirebaseConfigured } from '../lib/firebase';

/**
 * Service for handling Firebase Storage image uploads and deletions for products.
 */

export interface ImageUploadResult {
  downloadUrl: string;
  storagePath: string;
}

/**
 * Converts a File to a compressed Data URL if Firebase Storage is not provisioned or unreachable.
 */
export function fileToDataUrl(file: File, maxWidth = 1000): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        } else {
          resolve(event.target?.result as string || '');
        }
      };
      img.onerror = () => resolve(event.target?.result as string || '');
      img.src = event.target?.result as string || '';
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export async function uploadProductImage(file: File, productId: string): Promise<ImageUploadResult> {
  // Try Firebase Storage first if configured
  if (isFirebaseConfigured && storage) {
    const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const storagePath = `products/${productId}/${cleanFileName}`;
    const storageRef = ref(storage, storagePath);

    try {
      const uploadPromise = uploadBytes(storageRef, file, {
        contentType: file.type || 'image/jpeg',
      }).then((snapshot) => getDownloadURL(snapshot.ref));

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Firebase Storage timeout after 4s')), 4000);
      });

      const downloadUrl = await Promise.race([uploadPromise, timeoutPromise]);
      return {
        downloadUrl,
        storagePath,
      };
    } catch (err: any) {
      console.warn('Firebase Storage upload unavailable or timed out. Falling back to Data URL storage:', err?.message || err);
    }
  }

  // Fallback to Data URL image representation
  const dataUrl = await fileToDataUrl(file);
  return {
    downloadUrl: dataUrl,
    storagePath: '',
  };
}

export async function deleteProductImage(storagePath: string): Promise<void> {
  if (!isFirebaseConfigured || !storage || !storagePath) return;

  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.warn('Could not delete image from Firebase Storage:', error);
    // Non-blocking catch to allow Firestore record deletion even if image cleanup fails
  }
}
