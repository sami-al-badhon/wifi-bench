'use client';

import { faArrowLeftRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { PutBlobResult } from '@vercel/blob';
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [pending, setPending] = useState(false);
  return (
    <div className="flex flex-col items-center  mt-[30%] md:mt-16">
      <h1 className="text-center text-4xl mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Upload Your Avatar
      </h1>

      <form
        onSubmit={async event => {
          event.preventDefault();
          setPending(true);

          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/avatar/upload?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            }
          );

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
          setPending(false);
          inputFileRef.current.value = '';
          inputFileRef.current.files = null;
        }}>
        <div className="flex justify-center items-center gap-2 p-4 ">
          <input
            className="block w-full md:w-xl text-sm text-gray-600
    file:mr-4 file:py-2 file:px-4 file:ml-0.5 file:my-0.5
    file:rounded-l-lg file:rounded-r-4xl file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-600 hover:file:bg-blue-500 file:text-white
    hover:file:cursor-pointer
    transition-colors duration-200
    border border-gray-300 rounded-lg
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            name="file"
            ref={inputFileRef}
            type="file"
            required
          />
          {pending ? (
            <button
              className="bg-blue-400 cursor-not-allowed  p-2 text-lg rounded-md"
              disabled
              type="submit">
              Uploading...
            </button>
          ) : (
            <button
              className="bg-blue-600 cursor-pointer hover:bg-blue-500 p-2 text-lg rounded-md"
              type="submit">
              Upload
            </button>
          )}
        </div>
      </form>
      {blob && (
        <div className="text-center mt-2">
          Blob url:{' '}
          <a
            target="_blank"
            className="underline text-blue-500"
            href={blob.url}>
            {blob.url}
          </a>
        </div>
      )}
      <Link
        className="bg-blue-600 rounded-md hover:bg-blue-500 p-1 flex items-center gap-0.5 text-2xl"
        href="/">
        <FontAwesomeIcon className="w-5  " icon={faArrowLeftRotate} />
        Home
      </Link>
    </div>
  );
}
