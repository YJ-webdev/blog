'use client';

import { useState, useEffect } from 'react';

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

export const LoginDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        setIsOpen((prev) => !prev); // Toggle dialog
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <Card className="border-none shadow-none">
            <CardHeader>
              <DialogTitle>
                <CardTitle className="font-medium text-lg text-center">
                  Log in to Bravura!
                </CardTitle>
              </DialogTitle>
              <CardDescription className="text-center tracking-tight">
                with your Google or Github account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <GoogleSignIn />
              <div className="items-center justify-cente relative mt-3 -mb-2">
                <hr />
                <p className="z-10 mx-auto w-10 -translate-y-3 bg-white dark:bg-black text-center text-sm text-black dark:text-gray-400">
                  or
                </p>
              </div>
              <GithubSignIn />
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              By continuing, Bravura will receive ongoing access to the
              information you share and OAuth provider will record when Bravura
              accesses it
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};
