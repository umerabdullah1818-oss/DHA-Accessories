import { seedProductsToFirestore, getFirestoreProductsCount, fetchProductsFromFirestore } from '../services/firebaseService';

async function main() {
  console.log('--- Executing Seed Migration ---');
  const seedResult = await seedProductsToFirestore();
  console.log('Seed Result:', JSON.stringify(seedResult, null, 2));

  console.log('\n--- Checking Firestore Products Count ---');
  const count = await getFirestoreProductsCount();
  console.log(`Total documents in Firestore 'products' collection: ${count}`);

  console.log('\n--- Fetching Products from Firestore ---');
  const products = await fetchProductsFromFirestore();
  if (products) {
    console.log(`Fetched ${products.length} products successfully from Firestore.`);
    
    // Pick representative products from multiple categories
    const categoriesToSample = ['headphones', 'mobile-cases', 'smart-watches', 'chargers-cables', 'car-accessories'];
    for (const cat of categoriesToSample) {
      const sample = products.find((p) => p.categoryId === cat);
      if (sample) {
        console.log(`\nSample Product [Category: ${cat}]:`);
        console.log(JSON.stringify({
          id: sample.id,
          name: sample.name,
          price: sample.price,
          categoryId: sample.categoryId,
          categoryName: sample.categoryName,
          image: sample.image,
          stockCount: sample.stockCount,
          inStock: sample.inStock,
          brand: sample.brand,
          createdAt: sample.createdAt,
          updatedAt: sample.updatedAt,
        }, null, 2));
      }
    }
  }
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error during seed execution:', err);
  process.exit(1);
});

