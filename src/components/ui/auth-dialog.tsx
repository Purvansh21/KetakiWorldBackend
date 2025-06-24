"use client"

import { SignInButton, SignUpButton, SignedOut, SignedIn, UserButton } from '@clerk/clerk-react';
import { Button } from './button';

export function AuthDialog() {
  return (
    <div className="flex gap-2">
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="outline">Log in</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="bg-partner-500 hover:bg-partner-600 text-white">Sign Up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
              </div>
  );
} 