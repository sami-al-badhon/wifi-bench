'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';

export default function BottomLottie() {
  const [viewed, setViewed] = useState(true);

  if (viewed) {
    setTimeout(() => {
      setViewed(false);
    }, 4000);
  }

  return (
    <>
      {' '}
      {viewed && (
        <div className="fixed  top-0 left-0 right-0 z-50">
          <DotLottieReact
            src="https://lottie.host/c35eedb1-8a69-411c-83f9-fc3ccb723799/h8x29YcKrC.lottie"
            loop={false}
            autoplay
            width={100}
            height={80}
          />
        </div>
      )}
    </>
  );
}
