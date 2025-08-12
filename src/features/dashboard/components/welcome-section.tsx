import { Link } from "waku";
import { getContextData } from "waku/middleware/context";
import { Counter } from "../../counter";
import { SignOutLink } from "../../auth/components/sign-out-button";
import type { Session } from "../../auth/types";

interface WelcomeSectionProps {
  title: string;
  headline: string;
  body: string;
}

export function WelcomeSection({ title, headline, body }: WelcomeSectionProps) {
  const session = getContextData().session as Session | undefined;

  return (
    <div className="space-y-6">
      <title>{title}</title>
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{headline}</h1>
        <p className="text-lg text-gray-600">{body}</p>
        
        {session && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-700">Welcome back, {session.user.name}!</span>
            <SignOutLink />
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center space-y-6">
        <Counter />
        <Link to="/about" className="inline-block underline text-blue-600 hover:text-blue-800">
          About page
        </Link>
      </div>
    </div>
  );
}
