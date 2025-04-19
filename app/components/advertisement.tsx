'use client';

import React, { useEffect, useState } from 'react';

type CoupangProduct = {
  productId: number;
  productName: string;
  productImage: string;
  productUrl: string;
};

export const Advertisement = () => {
  const [product, setProduct] = useState<CoupangProduct | null>(null);

  useEffect(() => {
    const storedSearchHistory = JSON.parse(
      localStorage.getItem('userSearchHistory') || '[]',
    );
    const recentSearch =
      storedSearchHistory[storedSearchHistory.length - 1] || '추천';

    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/coupang/search?keyword=${recentSearch}`);
        const data = await res.json();
        console.log('Fetched ad data:', data);

        const item = data?.data?.productData?.[0];
        if (item) {
          setProduct({
            productId: item.productId,
            productName: item.productName,
            productImage: item.productImage,
            productUrl: item.productUrl,
          });
        }
      } catch (err) {
        console.error('Failed to fetch Coupang ad:', err);
      }
    };

    fetchAd();
  }, []);

  if (!product) {
    return (
      <div className="border-t border-b mt-4 mx-4 text-center bg-zinc-100 aspect-[5/1] flex items-center justify-center">
        <p>광고</p>
      </div>
    );
  }

  return (
    <a
      href={product.productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="border-t border-b mt-4 mx-4 bg-white p-4 flex gap-4 items-center hover:bg-gray-50 transition"
    >
      <img
        src={product.productImage || '/placeholder.png'}
        alt={product.productName}
        className="h-24 object-contain rounded"
      />
      <div className="text-left text-sm line-clamp-2">
        {product.productName}
      </div>
    </a>
  );
};
