import { cn } from '@/lib/utils';
import React from 'react';

interface TiptapMenuProps {
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
  name?: string;
  subname?: string;
}

export const TiptapMenu = ({
  icon,
  onClick,
  className,
  name,
  subname,
}: TiptapMenuProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-between hover:bg-zinc-100 w-full',
        className,
      )}
    >
      <div className="flex w-full text-start gap-1">
        <div className="self-center p-2 w-fit rounded-sm bg-zinc-200/60 my-1 mx-2">
          {icon}
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm w-full">{name}</p>
          <p className="text-[11px] font-light w-full">{subname}</p>
        </div>
      </div>
    </button>
  );
};
