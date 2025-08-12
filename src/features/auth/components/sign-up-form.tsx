"use client";

import { useState, useTransition } from "react";
import { useRouter } from "waku";
import { authClient } from "../api/auth-client";
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui";

export function SignUpForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
              if (onSuccess) {
                onSuccess();
              } else {
                // Use router navigation instead of page reload
                router.push("/dashboard");
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
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="signup-name">Name</Label>
            <Input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              aria-describedby={error ? "signup-error" : undefined}
              aria-invalid={!!error}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-describedby={error ? "signup-error" : undefined}
              aria-invalid={!!error}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="Create a password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
              aria-describedby={error ? "signup-error" : "password-help"}
              aria-invalid={!!error}
            />
            <div id="password-help" className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            aria-describedby={isPending ? "signup-loading" : undefined}
          >
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>
          
          {isPending && (
            <div id="signup-loading" className="sr-only">
              Please wait, creating your account...
            </div>
          )}
          
          {error && (
            <div 
              id="signup-error"
              role="alert"
              aria-live="polite"
              className="text-destructive text-sm bg-destructive/10 p-3 rounded-md border border-destructive/20"
            >
              {error}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
