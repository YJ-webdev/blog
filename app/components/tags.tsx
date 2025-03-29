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
import { TagButton, TagLink } from './tag-button';

interface TagsProps {
  tagsKey: string;
  isEditable: boolean;
  tagsData: Tag[];
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export const Tags = ({
  isEditable,
  tagsKey,
  tagsData,
  tags,
  // setTags,
}: TagsProps) => {
  const [value, setValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags || []);
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

  const tagsnames = tags.map((tag) => tag.name);
  const filteredTags = tagsData.filter((tag) => !tagsnames.includes(tag.name));

  return (
    <div className="flex flex-col">
      {isEditable ? (
        <div className="w-full flex flex-wrap gap-2 mt-2 mb-12">
          {tags?.map((item) => (
            <TagButton
              key={item.name}
              item={item}
              className={cn(
                selectedTags.some((tag) => tag.name === item.name) &&
                  'bg-primary dark:bg-zinc-100 text-white dark:text-black',
                stringSavedTags.includes(item.id) &&
                  'bg-primary dark:bg-zinc-100  text-white dark:text-black',
              )}
              onClick={() => toggleTag(item)}
            />
          ))}

          {filteredTags?.map((item) => (
            <TagButton
              key={item.name}
              item={item}
              className={cn(
                selectedTags.some((tag) => tag.name === item.name) &&
                  'bg-primary dark:bg-zinc-100 text-white dark:text-black',
                stringSavedTags.includes(item.id) &&
                  'bg-primary dark:bg-zinc-100 text-white dark:text-black',
              )}
              onClick={() => toggleTag(item)}
            />
          ))}

          {enteredTags.map((enteredTag) => (
            <TagButton
              key={enteredTag.name}
              item={enteredTag}
              className="w-fit py-2 px-3 rounded-full hover:bg-primary/10 text-[14px] cursor-pointer active:scale-90 duration-300 ease-out transition-all bg-primary text-white dark:text-black"
              onClick={() => removeTag(enteredTag)}
            />
          ))}

          <Popover>
            <PopoverTrigger>
              <Plus
                size={18}
                strokeWidth={1.5}
                className="m-2 cursor-pointer"
              />
            </PopoverTrigger>

            <PopoverContent className="rounded-md border w-60 px-5 pb-5 dark:bg-zinc-100">
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
        <div className="w-full flex flex-wrap gap-2 mt-2 mb-12">
          {tags.map((item) => (
            <TagLink
              key={item.name} // Prefer a unique identifier instead of index
              item={item}
              selected={selectedTags.some((tag) => tag.name === item.name)}
              onClick={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};
