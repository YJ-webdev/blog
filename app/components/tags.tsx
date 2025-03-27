'use client';

import { Plus } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Tag } from '@prisma/client';

interface TagsProps {
  tagsKey: string;
  isEditable: boolean;
  tagsData: Tag[];
  postTags?: Tag[];
}

export const Tags = ({ isEditable, tagsKey, tagsData }: TagsProps) => {
  const [value, setValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [enteredTags, setEnteredTags] = useState<Tag[]>([]);

  const savedTags = localStorage.getItem(tagsKey);
  const stringSavedTags = savedTags ? JSON.parse(savedTags) : [];

  const toggleTag = (tag: Tag) => {
    const isEnteredTag = enteredTags.some((t) => t.name === tag.name);

    if (isEnteredTag) {
      setEnteredTags(enteredTags.filter((t) => t.name !== tag.name));

      setSelectedTags((prevTags) =>
        prevTags.some((t) => t.name === tag.name)
          ? prevTags.filter((t) => t.name !== tag.name)
          : [...prevTags, tag],
      );
    }

    if (!isEnteredTag) {
      setSelectedTags((prevTags) =>
        prevTags.some((t) => t.name === tag.name)
          ? prevTags.filter((t) => t.name !== tag.name)
          : [...prevTags, tag],
      );
    }
  };

  const handleAddTag = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    const valueInObject = { id: 1, name: trimmedValue };

    const isDuplicate = enteredTags.some((item) => item.name === trimmedValue);
    const isExistingTag = tagsData.some((item) => item.name === trimmedValue);

    if (!isDuplicate) {
      setEnteredTags((prevTags) =>
        prevTags.some((t) => t.name === trimmedValue)
          ? prevTags
          : [...prevTags, valueInObject],
      );
    }

    if (isExistingTag) {
      setSelectedTags(selectedTags.filter((tag) => tag.name !== trimmedValue));
    }

    setValue('');
  };

  const removeTag = (tag: Tag) => {
    setEnteredTags((prevTags) => prevTags.filter((t) => t.name !== tag.name));
  };

  useEffect(() => {
    const uniqueTags = [
      ...new Map(
        [...selectedTags, ...enteredTags].map((tag) => [tag.name, tag]),
      ).values(),
    ];
    localStorage.setItem(tagsKey, JSON.stringify(uniqueTags));
  }, [selectedTags, enteredTags, tagsKey]);

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
                selectedTags.some((tag) => tag.name === item.name) &&
                  'bg-primary text-white dark:text-black',
                stringSavedTags.includes(item.id) &&
                  'bg-primary text-white dark:text-black',
              )}
              onClick={() => toggleTag(item)}
            >
              {item.name}
            </button>
          ))}

          {enteredTags.map((enteredTag) => (
            <div
              key={enteredTag.name}
              className={cn(
                'w-fit py-2 px-3 rounded-full hover:bg-primary/10 text-[14px] cursor-pointer active:scale-90  duration-300 ease-out transition-all bg-primary text-white dark:text-black',
              )}
              onClick={() => removeTag(enteredTag)}
            >
              {enteredTag.name}
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
                  minLength={2}
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
          {tagsData?.map((item, index) => (
            <button
              type="button"
              key={index}
              className={cn(
                'bg-primary text-white dark:text-black w-fit py-2 px-3 rounded-full text-[14px] sm:hover:bg-primary/10 active:scale-90 duration-300 ease-out transition-all',
                !stringSavedTags.includes(item.id) && 'hidden',
              )}
              onClick={() => {}}
            >
              {item.name}
            </button>
          ))}
          {enteredTags.map((enteredTag) => (
            <div
              key={enteredTag.name}
              className={cn(
                'w-fit py-2 px-3 rounded-full hover:bg-primary/10 text-[14px] cursor-pointer active:scale-90  duration-300 ease-out transition-all bg-primary text-white dark:text-black',
              )}
              onClick={() => removeTag(enteredTag)}
            >
              {enteredTag.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
