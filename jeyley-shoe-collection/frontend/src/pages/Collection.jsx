
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductSection from '../components/productsection';
import { getProducts } from '../services/productService';

function Collection({ title, gender, categorySlug }) {
  const [searchParams] = useSearchParams();

  const shoeType = searchParams.get('type');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const result = await getProducts({
          gender,
          shoeType,
          categorySlug
        });

        setProducts(result);
      } catch (err) {
        console.error(err);
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [gender, shoeType, categorySlug]);

  const displayTitle = shoeType
    ? `${title} ${shoeType === 'official' ? 'Official Shoes' : 'Sneakers'}`
    : title;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <div className="mb-10">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-3">
          JEYLEY COLLECTION
        </p>

        <h1 className="text-4xl font-black mb-3">
          {displayTitle}
        </h1>

        <p className="text-gray-500">
          Discover footwear designed for everyday confidence.
        </p>
      </div>

      {loading && (
        <p className="py-10 text-center">Loading products...</p>
      )}

      {error && (
        <p className="py-10 text-center text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="py-16 text-center">
          <h2 className="text-xl font-bold mb-2">
            No products available yet
          </h2>

          <p className="text-gray-500">
            Please check back soon for new arrivals.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductSection
          products={products}
          showHeading={false}
        />
      )}

    </main>
  );
}

export default Collection;
