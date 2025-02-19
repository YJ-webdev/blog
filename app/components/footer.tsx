import { auth } from '@/auth';
import { ModeToggle } from './mode-toggle';
import { LoginDialog } from './(auth)/login-dialog';
import { ShortCut } from './short-cut';

export default async function Footer() {
  const session = await auth();
  return (
    <div className="relative">
      <p className="text-muted-foreground md:text-sm text-xs text-center pt-28 pb-5">
        All rights reserved @2025
      </p>
      <div className="absolute bottom-5 right-[1rem]">
        {session?.user ? (
          <ModeToggle />
        ) : (
          <>
            <LoginDialog />
            <ShortCut />
          </>
        )}
      </div>
    </div>
  );
}
