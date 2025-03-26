'use client';

import { Plus } from 'lucide-react';
import { items } from '../lib/data';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const CategorizeTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="w-full flex flex-wrap gap-2 mt-2 mb-10">
      {items.map((item) => (
        <div
          key={item.name}
          className={cn(
            'w-fit py-2 px-3 rounded-full bg-muted text-sm cursor-pointer',
            selectedTags.includes(item.name) && 'bg-primary text-white',
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

        <PopoverContent className="w-60">
          <div className="grid gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                연관된 태그를 입력하세요.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex flex-col items-center gap-4">
                <Input id="width" className="w-full h-8" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
