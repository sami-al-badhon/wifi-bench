import Image from 'next/image';
import img1 from '@/public/img1.jpg';
import img2 from '@/public/img2.jpg';

import dashedImg from '@/public/dashed-img2.svg';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import BottomLottie from '@/components/Animation';

const allImg = [img1, img2];

export default function Home() {
  return (
    <div>
      <main className="min-h-screen">
        <p className="text-center text-3xl mt-5 bg-linear-to-r from-gray-800 to-white/80 bg-clip-text text-transparent">
          Assalamu Alaikum
        </p>
        <h1 className="text-center text-5xl mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to Wifi Bench!
        </h1>
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6 justify-center gap-2 p-4 mt-4">
          {allImg.map((img, index) => {
            return (
              <div key={index} className="flex flex-col  items-center">
                <div className="border-[3] border-dashed  border-gray-300 rounded-sm p-1">
                  {' '}
                  <Image
                    className="rounded-sm"
                    src={img}
                    placeholder="blur"
                    alt={`img-${index}`}
                  />{' '}
                </div>
                {allImg.length - 1 <= index ? null : (
                  <Image
                    className="mt-2 md:hidden "
                    src={dashedImg}
                    alt="dashed"
                  />
                )}
              </div>
            );
          })}
        </div>
      </main>
      <footer
        className="bg-gray-900   text-center 
      content-center text-white/85 flex flex-col items-center h-min p-2 ">
        <Link
          href="https://maps.app.goo.gl/Bq6fvSmpNoAuoeSz9"
          target="blank"
          className="flex gap-2 underline underline-offset-5 decoration-1 decoration-dashed decoration-blue-500 *:not-first:text-blue-500 mb-1 ">
          <FontAwesomeIcon className="w-4  " icon={faLocationDot} />
          <address>Khusir Bazar, Faridpur, Bangladesh</address>
        </Link>
        <p>Created at 2025</p>
      </footer>
      <BottomLottie />
    </div>
  );
}
