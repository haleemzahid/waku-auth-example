"use client";

import { useState, useTransition } from "react";
import { authClient } from "../api/auth-client";
import { useRouter } from "waku";
import { Button } from "@/shared/components/ui";

export function SignOutLink() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              // Use router navigation instead of reload
              router.push("/");
            },
            onError: (error) => {
              console.error("Sign out error:", error);
            },
          },
        });
      } catch (error) {
        console.error("Sign out failed:", error);
        // Fallback to home page even if sign out fails
        router.push("/");
      }
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleSignOut}
      disabled={isPending}
      aria-label={isPending ? "Signing out..." : "Sign out of your account"}
    >
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
