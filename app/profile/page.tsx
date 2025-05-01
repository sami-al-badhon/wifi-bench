import React from 'react';
import { SignedIn, UserButton } from '@clerk/nextjs';

const page = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center p-4 gap-4 ">
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default page;
