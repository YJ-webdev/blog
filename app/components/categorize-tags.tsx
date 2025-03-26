'use client';

import { Plus } from 'lucide-react';
import { items } from '../lib/data';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const CategorizeTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const updatedTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag) // Remove if already selected
        : [...prev, tag]; // Add if not selected

      console.log(updatedTags); // Logs the correct updated state
      return updatedTags;
    });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-wrap gap-2 mt-2 mb-10">
        {items.map((item) => (
          <div
            key={item.name}
            className={cn(
              'w-fit py-2 px-3 rounded-full bg-muted hover:bg-primary/10 text-[14px] cursor-pointer active:scale-90  duration-300 ease-out transition-all',
              selectedTags.includes(item.name) &&
                'bg-primary text-white dark:text-black',
            )}
            onClick={() => toggleTag(item.name)}
          >
            {item.name}
          </div>
        ))}

        <Popover>
          <PopoverTrigger>
            <Plus size={18} strokeWidth={1.5} className="m-2 cursor-pointer" />
          </PopoverTrigger>

          <PopoverContent className="rounded-lg w-60 px-5 pb-5 dark:bg-zinc-100">
            <div className="grid w-full">
              <p className="text-xs text-zinc-500 w-full text-center">
                직접 입력하기.
              </p>

              <input
                type="text"
                value={value}
                minLength={3}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(e.target.value);
                }}
                className="text-[15px] outline-none text-black border-b w-48 mx-auto mt-3 pb-[1px] mb-1 bg-transparent"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
