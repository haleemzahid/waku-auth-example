"use client";

import { useState } from "react";
import { SignUpForm } from "./sign-up-form";
import { SignInForm } from "./sign-in-form";
import { Button, ErrorBoundary } from "../../../shared/components";

export function AuthForms() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");

  return (
    <ErrorBoundary>
      <div className="w-full max-w-md mx-auto">
        {mode === "signup" ? (
          <>
            <SignUpForm />
            <div className="mt-4 text-center">
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={() => setMode("signin")}
                className="p-0 h-auto"
                aria-label="Switch to sign in form"
              >
                Sign in.
              </Button>
            </div>
          </>
        ) : (
          <>
            <SignInForm />
            <div className="mt-4 text-center">
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={() => setMode("signup")}
                className="p-0 h-auto"
                aria-label="Switch to sign up form"
              >
                Sign up.
              </Button>
            </div>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}
