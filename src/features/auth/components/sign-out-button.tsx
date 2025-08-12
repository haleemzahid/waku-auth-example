"use client";

import { authClient } from "../api/auth-client";
import { useRouter } from "waku";
import { Button } from "@/shared/components/ui";

export function SignOutLink() {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.reload();
        },
      },
    });
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
