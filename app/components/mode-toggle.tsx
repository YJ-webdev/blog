'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const isDarkMode = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? (
        <Sun className="h-[1rem] w-[1rem] transition-all dark:rotate-0 dark:scale-100" />
      ) : (
        <Moon className="h-[1rem] w-[1rem] transition-all dark:rotate-0 dark:scale-100" />
      )}
    </button>
  );
}
