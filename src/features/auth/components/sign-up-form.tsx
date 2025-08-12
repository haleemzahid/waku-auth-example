"use client";

import { useState, useTransition } from "react";
import { authClient } from "../api/auth-client";
import { Button, Input } from "../../../shared/components";

export function SignUpForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const { error } = await authClient.signUp.email(
          { email, password, name },
          {
            onRequest: () => {},
            onSuccess: () => {
              if (onSuccess) onSuccess();
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
      className="max-w-sm mx-auto p-4 border rounded space-y-4"
    >
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      
      <Input
        type="text"
        label="Name"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
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
        placeholder="Create a password (min 8 characters)"
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
        Sign Up
      </Button>
      
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}
