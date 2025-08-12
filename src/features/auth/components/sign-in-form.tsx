"use client";

import { useState, useTransition } from "react";
import { authClient } from "../api/auth-client";
import { Button, Input } from "../../../shared/components";

export function SignInForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const { error } = await authClient.signIn.email(
          {
            email,
            password,
          },
          {
            onRequest: () => {},
            onSuccess: () => {
              if (onSuccess) {
                onSuccess();
              } else {
                window.location.reload();
              }
            },
            onError: (ctx) => {
              setError(ctx.error.message);
            },
          }
        );
        if (error) setError(error.message || String(error));
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-4 border rounded mt-6 space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      
      <Input
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
      />
      
      <Button
        type="submit"
        className="w-full"
        isLoading={isPending}
      >
        Sign In
      </Button>
      
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}
