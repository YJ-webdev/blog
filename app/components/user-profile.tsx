import React from 'react';
import { User } from 'lucide-react';

export const UserProfile = ({ userName }: { userName: string }) => {
  return (
    <div className=" z-[99999]">
      {userName ? (
        <>
          <p className="hidden lg:block">{`Hi, ${userName}`}</p>
          <User className="lg:hidden" />
        </>
      ) : (
        <User />
      )}
      {userName === null && <User />}
    </div>
  );
};
