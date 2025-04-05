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
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <Card className="border-none shadow-none dark:bg-transparent">
            <CardHeader>
              <DialogTitle>
                <CardTitle className="font-medium text-lg text-center">
                  애쉬저널에 오신 것을 환영합니다.
                </CardTitle>
              </DialogTitle>
              <CardDescription className="text-center tracking-tight">
                구글 또는 깃허브로 로그인하세요
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
            <CardFooter className="text-xs text-muted-foreground text-center">
              로그인시, 애쉬저널에서 사용자가 공유하는 정보에 지속적으로
              액세스할 수 있으며, OAuth 제공자는 애쉬저널이 해당 정보에 액세스한
              시점을 기록하게 됩니다.
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};
