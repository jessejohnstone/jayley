
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getCategories } from '../services/productService';

const categoryImages = {
  'mens-shoes':
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
  'womens-shoes':
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
  'ladies-heels':
    'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800',
};

const fallbackCategories = [
  { id: 'ladies-heels', slug: 'ladies-heels', name: "Ladies' Heels" },
  { id: 'mens-shoes', slug: 'mens-shoes', name: "Men's Shoes" },
  { id: 'womens-shoes', slug: 'womens-shoes', name: "Women's Shoes" },
];

function CategorySection({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (data?.length) {
          setCategories(data);
        } else {
          setCategories(fallbackCategories);
          setError('Showing featured categories while the live category list is unavailable.');
        }
      } catch (err) {
        console.error('Category error:', err);
        setCategories(fallbackCategories);
        setError('Showing featured categories because live categories could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="categories" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 font-semibold mb-3">
              Find Your Style
            </p>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              SHOP BY CATEGORY
            </h2>

            <p className="text-gray-500 mt-4">
              Explore footwear designed for every style and occasion.
            </p>
          </div>

          <a
            href="#shop"
            className="flex items-center gap-2 font-semibold hover:gap-4 transition-all"
          >
            View all products <ArrowUpRight size={19} />
          </a>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-gray-500">Loading categories...</p>
        )}

        {/* Error State */}
        {error && <p className="mb-5 text-sm text-gray-500">{error}</p>}

        {/* Category Cards */}
        {!loading && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {categories.map((category) => (
              <a
                key={category.id}
                href="#shop"
                onClick={() => onSelectCategory?.(category)}
                className="group relative h-[420px] overflow-hidden rounded-xl bg-gray-100"
              >
                <img
                  src={
                    categoryImages[category.slug] ||
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
                  }
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7 text-white flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-200 mb-2">
                      Explore Collection
                    </p>

                    <h3 className="text-2xl md:text-3xl font-bold">
                      {category.name}
                    </h3>
                  </div>

                  <div className="bg-white text-black rounded-full p-3 group-hover:bg-black group-hover:text-white transition">
                    <ArrowUpRight size={22} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <p className="text-gray-500">
            No categories available yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default CategorySection;
