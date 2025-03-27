'use client';

import { Plus } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { PostTag, Tag } from '@prisma/client';

interface CategorizeTagsProps {
  tagsKey: string;
  isEditable: boolean;
  setTags: (tags: Tag[]) => void;
  setSelectedTags: (tags: string[]) => void;
  setEnteredTags: (tags: string[]) => void;
  enteredTags: string[];
  selectedTags: string[];
  savedTags?: PostTag[];
  tagskey?: string;
  tagsData: Tag[];
}

export const CategorizeTags = ({
  isEditable,
  setTags,
  setSelectedTags,
  setEnteredTags,
  enteredTags,
  selectedTags,
  tagsKey,
  tagsData,
}: CategorizeTagsProps) => {
  const [value, setValue] = useState('');

  const savedTags = localStorage.getItem(tagsKey);
  const stringSavedTags = savedTags ? JSON.parse(savedTags) : [];

  const toggleTag = (tag: string) => {
    const isEnteredTag = enteredTags.includes(tag);

    if (!isEnteredTag) {
      const updatedTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag) // Remove if already selected
        : [...selectedTags, tag]; // Add if not selected

      setSelectedTags(updatedTags); // Pass the updated array directly
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = enteredTags.filter((t) => t !== tag);
    setEnteredTags(updatedTags); // Pass the updated array directly
  };

  const handleAddTag = () => {
    const trimmedValue = value.trim();

    if (trimmedValue.length >= 2) {
      const isDuplicate = enteredTags.includes(trimmedValue);
      const isExistingTag = tagsData.some((item) => item.name === trimmedValue);

      if (!isDuplicate) {
        setEnteredTags([...enteredTags, trimmedValue]); // Pass the updated array directly
      }

      if (isExistingTag) {
        setSelectedTags(selectedTags.filter((tag) => tag !== trimmedValue)); // Pass the updated array directly
      }
    }

    setValue('');
  };

  useEffect(() => {
    const allTags = [...new Set([...selectedTags, ...enteredTags])];
    setTags(allTags.map((tag) => ({ id: 1, name: tag })));
  }, [selectedTags, enteredTags]);

  return (
    <div className="flex flex-col">
      {isEditable ? (
        <div className="w-full flex flex-wrap gap-2 mt-2 mb-10">
          {tagsData?.map((item, index) => (
            <button
              type="button"
              key={index}
              disabled={!isEditable}
              className={cn(
                'w-fit py-2 px-3 rounded-full bg-muted text-[14px] sm:hover:bg-primary/10 active:scale-90 duration-300 ease-out transition-all',
                selectedTags.includes(item.name) &&
                  'bg-primary text-white dark:text-black',
                stringSavedTags.includes(item.id) &&
                  'bg-primary text-white dark:text-black',
              )}
              onClick={() => toggleTag(item.name)}
            >
              {item.name}
            </button>
          ))}
          {enteredTags.map((enteredTag) => (
            <div
              key={enteredTag}
              className={cn(
                'w-fit py-2 px-3 rounded-full hover:bg-primary/10 text-[14px] cursor-pointer active:scale-90  duration-300 ease-out transition-all bg-primary text-white dark:text-black',
              )}
              onClick={() => removeTag(enteredTag)}
            >
              {enteredTag}
            </div>
          ))}

          <Popover>
            <PopoverTrigger>
              <Plus
                size={18}
                strokeWidth={1.5}
                className="m-2 cursor-pointer"
              />
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="text-[15px] outline-none text-black border-b w-48 mx-auto mt-3 pb-[1px] mb-1 bg-transparent"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-2 mt-2 mb-10">
          {stringSavedTags.length > 0 ? (
            stringSavedTags.map((item: string) => (
              <button
                type="button"
                key={item}
                disabled={!isEditable}
                className="w-fit py-2 px-3 rounded-full bg-primary text-white dark:text-black text-[14px] sm:hover:bg-primary/10 active:scale-90 duration-300 ease-out transition-all"
              >
                {item}
              </button>
            ))
          ) : (
            <p>No tags available</p>
          )}
        </div>
      )}
    </div>
  );
};
