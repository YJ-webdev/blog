'use client'; // Client-side component

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export default function ClientOnlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setIsClient(true);
    // Check localStorage or system theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme); // Save the selected theme
    }
  }, [theme]);

  return (
    <>
      {isClient && (
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          enableSystem={true}
          disableTransitionOnChange
          storageKey="theme"
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      )}
    </>
  );
}
