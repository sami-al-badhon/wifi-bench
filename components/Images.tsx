// app/components/Images.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import dashedImg from '@/public/dashed-img2.svg';
import BottomLottie from './Animation';

interface BlobObject {
  pathname: string;
  url: string;
  size: number;
  uploadedAt: Date;
  // Add other properties you need from the blob objects
}

const Images = () => {
  const [images, setImages] = useState<BlobObject[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreImages = async () => {
    if (!hasMore) return;

    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor);

    try {
      const response = await fetch(`/api/images?${params.toString()}`);
      const {
        images: newImages,
        nextCursor,
        hasMore: newHasMore,
      } = await response.json();

      setImages(prev => [...prev, ...newImages]);
      setCursor(nextCursor);
      setHasMore(newHasMore);
    } catch (error) {
      console.error('Error loading more images:', error);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreImages();
    }
  }, [inView]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6 justify-center gap-2 p-4 mt-4">
      {images.map((img, index) => (
        <div key={img.pathname} className="flex flex-col items-center">
          <div className="border-[3] border-dashed border-gray-300 rounded-sm p-1">
            <Image
              priority
              className="rounded-sm"
              src={img.url}
              placeholder="blur"
              alt="image"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
              width={1000}
              height={1000}
            />
          </div>
          {index < images.length - 1 && (
            <Image className="mt-2 md:hidden" src={dashedImg} alt="dashed" />
          )}
        </div>
      ))}

      {/* Loading trigger */}
      <div ref={ref} className="h-10 invisible" />

      {!hasMore && images.length > 0 && <BottomLottie />}

      {/* Loading indicator */}
      {hasMore && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
        </div>
      )}
    </div>
  );
};

export default Images;
