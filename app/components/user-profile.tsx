/* eslint-disable @next/next/no-img-element */
import React from 'react';

export const UserProfile = ({ firstLetter }: { firstLetter: string }) => {
  return (
    <div className="relative w-10 h-10 z-[99999] rounded-full overflow-hidden">
      {/* Avatar Image */}
      <img
        src="https://avatar.vercel.sh/rauchg?rounded=60"
        alt="Avatar"
        className="w-full h-full object-cover"
      />
      {/* First Letter Overlay */}
      <span className="absolute inset-0 flex items-center justify-center text-sm text-white">
        {firstLetter}
      </span>
    </div>
  );
};
