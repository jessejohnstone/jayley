
import { supabase } from './supabase';

export const uploadProductImage = async (file) => {
  if (!file) {
    throw new Error('Please select an image.');
  }

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only JPG, PNG and WebP images are allowed.');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Image size must not exceed 5MB.');
  }

  const extension = file.name.split('.').pop().toLowerCase();

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
