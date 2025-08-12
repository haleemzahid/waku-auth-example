import { createAuthClient } from "better-auth/react";

declare global {
  interface ImportMeta {
    env: {
      WAKU_PUBLIC_BETTER_AUTH_URL?: string;
    };
  }
}

// Get the proper base URL for different environments
const getBaseURL = () => {
  // In production, use the current domain
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  
  // Use environment variable or fallback to localhost
  return import.meta.env.WAKU_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: getBaseURL(),
});

export type Session = typeof authClient.$Infer.Session;
