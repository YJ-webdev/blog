import { handleSignIn } from '@/app/actions/auth';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleSignIn() {
  return (
    <form action={async () => await handleSignIn('google')}>
      <div className="relative flex items-center justify-center hover:bg-primary/5 border border-primary/20 rounded-lg">
        <FcGoogle size={26} className="absolute left-4" />
        <button type="submit" className="px-4 py-2 outline-none">
          Log in with <strong>Google</strong>
        </button>
      </div>
    </form>
  );
}
