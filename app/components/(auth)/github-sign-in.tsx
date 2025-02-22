import { handleSignIn } from '@/app/actions/auth';
import { BsGithub } from 'react-icons/bs';

export default function GithubSignIn() {
  return (
    <form action={async () => await handleSignIn('github')}>
      <div className="relative flex items-center justify-center hover:bg-primary/5 border border-primary/20 rounded-lg">
        <BsGithub size={24} className="absolute left-4" />
        <button type="submit" className="px-4 py-2">
          Log in with <strong>Github</strong>
        </button>
      </div>
    </form>
  );
}
