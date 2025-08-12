"use client";

import { useState } from "react";
import { SignUpForm } from "./sign-up-form";
import { SignInForm } from "./sign-in-form";
import { Button } from "../../../shared/components";

export function AuthForms() {
  const [mode, setMode] = useState<"signup" | "signin">("signup");

  return (
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
            >
              Sign up.
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
