import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import GoogleSignIn from './google-sign-in';
import GithubSignIn from './github-sign-in';

interface LoginDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const LoginDialog = ({ isOpen, setIsOpen }: LoginDialogProps) => {
  // Handle keyboard shortcut

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <Card className="border-none shadow-none dark:bg-transparent">
            <CardHeader>
              <DialogTitle>
                <CardTitle className="font-medium text-lg text-center">
                  Log in to 2025년 주목해야할 트렌드.!
                </CardTitle>
              </DialogTitle>
              <CardDescription className="text-center tracking-tight">
                with your Google or Github account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <GoogleSignIn />
              <div className="items-center justify-cente relative mt-3 -mb-2">
                <hr className="border-1 border-primary/20" />
                <p className="z-10 mx-auto w-10 -translate-y-3 bg-white dark:bg-[#1f1f1f] text-center text-sm text-black dark:text-gray-400">
                  or
                </p>
              </div>
              <GithubSignIn />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              By continuing, 2025년 주목해야할 트렌드. will receive ongoing
              access to the information you share and OAuth provider will record
              when 2025년 주목해야할 트렌드. accesses it
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};
