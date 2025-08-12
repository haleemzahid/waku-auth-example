"use client";

import { useState, useTransition } from "react";
import { useRouter } from "waku";
import { authClient } from "../api/auth-client";
import { Button, Input, Label, Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui";

export function SignInForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
    <Card className="max-w-sm mx-auto mt-6">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-describedby={error ? "signin-error" : undefined}
              aria-invalid={!!error}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signin-password">Password</Label>
            <Input
              id="signin-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete="current-password"
              aria-describedby={error ? "signin-error" : undefined}
              aria-invalid={!!error}
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            aria-describedby={isPending ? "signin-loading" : undefined}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
          
          {isPending && (
            <div id="signin-loading" className="sr-only">
              Please wait, signing you in...
            </div>
          )}
          
          {error && (
            <div 
              id="signin-error"
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
