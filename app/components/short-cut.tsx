import React from 'react';

export const ShortCut = () => {
  return (
    <div className="flex items-center gap-2">
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
        <span className="text-xs">Ctrl</span> + Z
      </kbd>{' '}
    </div>
  );
};
