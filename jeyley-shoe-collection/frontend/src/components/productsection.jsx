
import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';

import { getProducts } from '../services/productService';
import { useCart } from '../context/context';

function ProductSection({
  products: suppliedProducts,
  showHeading = true
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(!suppliedProducts);
  const [selectedVariants, setSelectedVariants] = useState({});

  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    if (suppliedProducts) {
      setProducts(suppliedProducts);
      setLoading(false);
      return;
    }

    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Product loading error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [suppliedProducts]);

  const handleAddToCart = (product) => {
    const variantId = selectedVariants[product.id];

    const variant = product.product_variants?.find(
      (item) => item.id === variantId
    );

    if (!variant) {
      alert('Please select a shoe size and colour.');
      return;
    }

    if (variant.stock_quantity < 1) {
      alert('This variant is out of stock.');
      return;
    }

    addToCart(product, variant);
    setIsCartOpen(true);
  };

  if (loading) {
    return <p className="py-10 text-center">Loading products...</p>;
  }

  return (
    <section id="shop" className="max-w-7xl mx-auto px-6 py-12">

      {showHeading && (
        <div className="mb-10">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            OUR COLLECTION
          </p>

          <h2 className="text-3xl font-black">
            Shop Our Shoes
          </h2>
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No products available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product) => {
            const availableVariants =
              product.product_variants?.filter(
                (variant) => variant.stock_quantity > 0
              ) || [];

            return (
              <article
                key={product.id}
                className="border rounded-xl overflow-hidden bg-white"
              >

                <div className="aspect-[4/5] bg-gray-100">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      No product image
                    </div>
                  )}
                </div>

                <div className="p-5">

                  <p className="text-xs text-gray-500 uppercase mb-2">
                    {product.categories?.name || 'JEYLEY'}
                  </p>

                  <h3 className="font-bold text-lg mb-2">
                    {product.name}
                  </h3>

                  <div className="flex gap-3 items-center mb-4">
                    <span className="font-bold">
                      KSh {Number(product.price).toLocaleString('en-KE')}
                    </span>

                    {product.original_price > product.price && (
                      <span className="text-gray-400 line-through text-sm">
                        KSh {Number(product.original_price).toLocaleString('en-KE')}
                      </span>
                    )}
                  </div>

                  <label className="text-sm font-medium">
                    Select size and colour
                  </label>

                  <select
                    className="w-full border rounded-lg p-3 mt-2 mb-4"
                    value={selectedVariants[product.id] || ''}
                    onChange={(event) =>
                      setSelectedVariants((current) => ({
                        ...current,
                        [product.id]: event.target.value
                      }))
                    }
                  >
                    <option value="">Choose an option</option>

                    {availableVariants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        Size {variant.size} - {variant.color}
                        {' '}({variant.stock_quantity} available)
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={availableVariants.length === 0}
                    className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 disabled:bg-gray-400"
                  >
                    <ShoppingBag size={18} />
                    {availableVariants.length === 0
                      ? 'Sold Out'
                      : 'Add to Cart'}
                  </button>

                  <button
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                    disabled={availableVariants.length === 0}
                    className="w-full mt-2 border border-black py-3 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                  >
                    Place Your Order
                  </button>

                </div>
              </article>
            );
          })}

        </div>
      )}

    </section>
  );
}

export default ProductSection;
