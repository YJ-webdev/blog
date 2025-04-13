import { cn } from '@/lib/utils';

export const TiptapButton = ({
  children,
  className,
  onClick,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}>) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-2 py-2 rounded-md hover:bg-zinc-100 border border-white tiptap',
        className,
      )}
    >
      {children}
    </button>
  );
};
