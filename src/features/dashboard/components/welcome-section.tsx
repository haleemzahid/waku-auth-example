import { Link } from "waku";
import { getContextData } from "waku/middleware/context";
import { Counter } from "../../counter";
import { SignOutLink } from "../../auth/components/sign-out-button";
import { Button, Card, CardHeader, CardTitle, CardContent, Separator } from "@/shared/components/ui";
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold tracking-tight text-center">{headline}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground text-center">{body}</p>
          
          {session && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-green-700">Welcome back, {session.user.name}!</span>
              <div className="mt-2">
                <SignOutLink />
              </div>
            </div>
          )}
          
          <Separator />
          
          <div className="flex flex-col items-center space-y-6">
            <Counter />
            <Button asChild>
              <Link to="/about">
                About page
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
