import React from 'react';
import { Product } from '../../sanity.types';
import Link from 'next/link';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';

interface ProductThumbProps {
  product: Product;
}

const ProductThumb: React.FC<ProductThumbProps> = ({ product }) => {
  // Check if the product is out of stock
  const isOutOfStock = product.stock != null && product.stock <= 0;

  // Function to get the product description from portable text
  const getDescription = () => {
    if (typeof product.description === 'string') return product.description;
    if (!product.description) return 'No description available';
    
    interface PortableTextBlock {
      _type: string;
      children?: { text: string }[];
    }
    
    return (product.description as PortableTextBlock[])
      .map((block: PortableTextBlock) =>
        block._type === 'block'
          ? block.children?.map((child) => child.text).join('')
          : ''
      )
      .join(' ');
  };

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
        isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || 'Product Image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        )}
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out Of Stock</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{getDescription()}</p>
        <p className="mt-2 text-lg font-bold text-gray-900">
          {product.price ? `$${product.price.toFixed(2)}` : 'Price Not Available'}
        </p>
      </div>
    </Link>
  );
};

export default ProductThumb;
