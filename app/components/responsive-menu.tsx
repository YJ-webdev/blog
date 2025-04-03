'use client';

import React, { useEffect, useState } from 'react';
import { DropDownMenu } from './drop-down-menu';

// import { Session } from 'next-auth';

// import { LoginDialog } from './(auth)/login-dialog';
// import { HomeIcon } from 'lucide-react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';

export const ResponsiveMenu = ({ userName }: { userName: string }) => {
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

  // const pathname = usePathname();
  return (
    <>
      <div className="items-center gap-6 flex">
        <div className="flex items-center">
          <DropDownMenu userName={userName} openLoginDialog={openLoginDialog} />
        </div>
      </div>
    </>
  );
};
