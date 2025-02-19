import { signOut } from '@/auth';

export default function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit" className="text-sm text-muted-foreground underline">
        Log out
      </button>
    </form>
  );
}
