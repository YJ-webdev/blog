'use client';

import React, { useEffect, useState } from 'react';
import { DropDownMenu } from './drop-down-menu';

import { Session } from 'next-auth';

import { LoginDialog } from './(auth)/login-dialog';

export const ResponsiveMenu = ({
  initials,
  session,
}: {
  initials: string;
  session: Session | null;
}) => {
  // const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  // Function to open the login dialog
  const openLoginDialog = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        setIsOpen((prev) => !prev); // Toggle dialog
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {session && session.user ? (
        <div className="items-center gap-6 flex">
          <div className="flex items-center">
            <DropDownMenu
              session={session}
              initials={initials}
              openLoginDialog={openLoginDialog}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="items-center gap-4 md:flex text-[14px]">
            <DropDownMenu
              session={session}
              initials={initials}
              openLoginDialog={openLoginDialog}
            />
          </div>

          <LoginDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
    </>
  );
};
