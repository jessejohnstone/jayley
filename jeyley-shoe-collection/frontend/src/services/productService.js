
import { supabase } from './supabase';

// Fetch all active products
export const getProducts = async (filters = {}) => {
  let query = supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      description,
      price,
      original_price,
      images,
      is_featured,
      gender,
      shoe_type,
      categories (
        name,
        slug
      ),
      product_variants (
        id,
        size,
        color,
        stock_quantity,
        sku
      )
    `)
    .eq('is_active', true);

  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }

  if (filters.shoeType) {
    query = query.eq('shoe_type', filters.shoeType);
  }

  if (filters.categorySlug) {
    query = query.eq('categories.slug', filters.categorySlug);
  }

  const { data, error } = await query.order(
    'created_at',
    { ascending: false }
  );

  if (error) throw error;

  return data;
};

// Fetch all categories
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;

  return data;
};
