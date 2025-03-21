import Link from 'next/link';
import { BadgeInfo } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-10rem)] items-center justify-center flex-col gap-2 mx-auto">
      <h2 className="flex gap-2">
        <BadgeInfo size="1.5rem" />
        Page Not Found
      </h2>
      <p className="text-xs text-muted-foreground">
        The post you are trying to reach may have been unpublished or deleted.
      </p>

      <Link
        href="/"
        className="underline text-muted-foreground hover:text-primary"
      >
        Return Home
      </Link>
    </div>
  );
}
