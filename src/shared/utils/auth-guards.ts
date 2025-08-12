import type { Session } from "../../features/auth/api/auth-client";

// Type guard to check if session is valid
export function isValidSession(session: unknown): session is Session {
  return (
    session !== null &&
    typeof session === "object" &&
    "user" in session! &&
    typeof (session as any).user === "object" &&
    "id" in (session as any).user &&
    "email" in (session as any).user
  );
}

// Type guard for session data from context
export function getSessionFromContext(contextData: any): Session | null {
  const session = contextData?.session;
  return isValidSession(session) ? session : null;
}
