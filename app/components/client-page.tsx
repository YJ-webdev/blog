'use client';

import { Title } from './title';
import { Toaster } from 'sonner';
import Footer from './footer';
import { useSidebar } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ClientPageProps {
  children: React.ReactNode;
}

export const ClientPage = ({ children }: ClientPageProps) => {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <div
      style={{
        minWidth: `calc(100vw - ${open ? '28rem' : '1rem'})`,
      }}
      className={cn(
        'flex relative transition-all ease-in-out mx-auto duration-500',
      )}
    >
      <div
        className={cn(
          'bg-white dark:bg-[#1f1f1f]  flex flex-col min-h-screen mx-auto transition-all ease-in-out duration-300',
          // open && '!-translate-x-52 transition-transform duration-300',
        )}
      >
        {!pathname.includes('/edit') && !pathname.includes('/new-post') && (
          <Title />
        )}
        <main className="flex-1">{children}</main>
        <Toaster />
        <Footer />
      </div>
    </div>
  );
};
