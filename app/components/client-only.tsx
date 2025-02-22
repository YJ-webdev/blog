'use client';

import React from 'react';
import { useClientOnly } from '../hooks/useClientOnly';

interface ClientOnlyProps {
  children: React.ReactNode;
}

export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const isClient = useClientOnly();

  if (!isClient) return null; // Prevents rendering on the server

  return <>{children}</>;
};
