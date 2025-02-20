import { ImageIcon } from 'lucide-react';
import React from 'react';

export const ImageDropZone = () => {
  return (
    <div className="relative w-full md:h-96 h-72">
      <div className="absolute top-0 left-0 w-full h-full bg-transparent border-2 rounded-lg border-dashed border-primary/50 dark:border-white/25" />
      <ImageIcon
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-muted-foreground"
        strokeWidth={1.5}
      />
    </div>
  );
};
