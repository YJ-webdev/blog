import Link from 'next/link';
import { BadgeInfo } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 justify-center mx-auto mt-[15%]">
      <h2 className="flex gap-2">
        <BadgeInfo size="1.5rem" />
        Page Not Found
      </h2>

      <Link
        href="/"
        className="underline text-muted-foreground hover:text-primary"
      >
        Return Home
      </Link>
    </div>
  );
}
