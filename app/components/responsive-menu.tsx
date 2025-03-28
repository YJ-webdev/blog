'use client';

import React, { useEffect, useState } from 'react';
import { DropDownMenu } from './drop-down-menu';

import { Session } from 'next-auth';

import { LoginDialog } from './(auth)/login-dialog';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const ResponsiveMenu = ({
  session,
  userName,
}: {
  session: Session | null;
  userName: string;
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

  const pathname = usePathname();
  return (
    <>
      {session && session.user ? (
        <div className="items-center gap-6 flex">
          <div className="flex items-center">
            <DropDownMenu
              session={session}
              userName={userName}
              openLoginDialog={openLoginDialog}
            />
          </div>
        </div>
      ) : (
        <>
          {pathname !== '/' && (
            <Link
              href={'/'}
              className="items-center mt-1 gap-4 md:flex text-[14px]"
            >
              <HomeIcon strokeWidth={1.5} />
            </Link>
          )}

          <LoginDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
    </>
  );
};
