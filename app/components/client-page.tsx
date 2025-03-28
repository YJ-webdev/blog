'use client';

import { Title } from './title';
import { Toaster } from 'sonner';
import Footer from './footer';
import { useSidebar } from '@/components/ui/sidebar';

export const ClientPage = ({ children }: { children: React.ReactNode }) => {
  const { open, setOpen } = useSidebar();
  return (
    <div
      style={{
        minWidth: `calc(100vw - ${open ? '28rem' : '1rem'})`,
      }}
      className="flex relative transition-all ease-in-out duration-500"
    >
      <div className="bg-white dark:bg-[#1f1f1f] flex flex-col w-full min-h-screen mx-auto transition-all ease-in-out duration-300">
        <Title />
        <main className="flex-1 max-w-[1000px] mx-auto">{children}</main>
        <Toaster />
        <Footer />
      </div>
    </div>
  );
};
