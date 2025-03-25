'use client';

import React, { useState } from 'react';
import { SideMenu } from './side-menu';
import { Title } from './title';
import { Toaster } from 'sonner';
import Footer from './footer';
import { cn } from '@/lib/utils';
import { PanelLeft, PanelLeftDashed } from 'lucide-react';

export const ClientPage = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex relative">
      <div
        className={cn(
          'z-[9999] fixed top-0 h-14 left-0 transition-all ease-in-out hover:text-primary',
          open ? 'w-[270px] bg-zinc-100 dark:bg-zinc-800' : '',
        )}
      >
        <button className="fixed top-5 left-5" onClick={() => handleClick()}>
          {open ? (
            <PanelLeftDashed className="" strokeWidth={1.5} size={26} />
          ) : (
            <PanelLeft
              className="bg-zinc-100  dark:bg-zinc-800"
              strokeWidth={1.5}
              size={26}
            />
          )}
        </button>
      </div>
      <SideMenu />
      <div
        className={cn(
          'z-[10] bg-white dark:bg-[#1f1f1f] flex flex-col min-h-screen mx-auto transition-all ease-in-out duration-300',
          open ? 'translate-x-[120px]' : 'w-full',
        )}
      >
        <Title />
        <main className={cn('flex-1 max-w-[1000px] mx-auto')}>{children}</main>
        <Toaster />
        <Footer />
      </div>
    </div>
  );
};
