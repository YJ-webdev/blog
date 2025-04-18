import { cn } from '@/lib/utils';
import { Tag } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface TagButtonProps {
  item: Tag;
  className?: string;
  onClick: () => void;
}

export const TagButton = ({ item, className, onClick }: TagButtonProps) => {
  return (
    <button
      type="button"
      key={item.name}
      className={cn(
        'w-fit py-2 px-3 rounded-full bg-muted hover:bg-primary/10 active:bg-primary/60  dark:hover:bg-white/15 text-sm hover:text-primary active:scale-90 duration-300 ease-out transition-all',
        className,
      )}
      onClick={onClick}
    >
      {item.name}
    </button>
  );
};

interface PostTagsProps {
  item: Tag;
}

export const PostTags = ({ item }: PostTagsProps) => {
  return (
    <Link
      href={`/tag/${item.name}`}
      className={cn(
        'w-fit py-2 px-3 rounded-full  text-sm cursor-pointer active:scale-90 duration-300 ease-out transition-all bg-primary dark:bg-zinc-100  text-white dark:text-black',
      )}
    >
      {item.name}
    </Link>
  );
};

export const TagLink = ({
  item,
  selected,
  onClick,
}: {
  item: Tag;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Link
      href={`/tag/${item.name}`}
      onClick={onClick}
      key={item.name}
      className={cn(
        'w-fit py-2 px-3 rounded-full hover:bg-primary/10 dark:hover:bg-white/15 text-[15px]/[22px] cursor-pointer active:scale-90 duration-300 ease-out transition-all',
        selected
          ? 'bg-primary dark:bg-zinc-100 text-white dark:text-black'
          : 'bg-muted',
      )}
    >
      {item.name}
    </Link>
  );
};
