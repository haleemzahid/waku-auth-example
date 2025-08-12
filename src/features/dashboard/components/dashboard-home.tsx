import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui";
import { WelcomeSection } from "./welcome-section";

interface DashboardHomeProps {
  title: string;
  headline: string;
  body: string;
}

export const DashboardHome = ({ title, headline, body }: DashboardHomeProps) => {
  return (
    <div className="space-y-6">
      <WelcomeSection 
        title={title}
        headline={headline}
        body={body}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Welcome!</div>
            <p className="text-muted-foreground">You're successfully logged in</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Explore what's available</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✅ Secure Authentication</li>
              <li>✅ Server Components</li>
              <li>✅ Modern UI</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
            <CardDescription>Use the sidebar to navigate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Check out the Counter page to see client-side interactions in action.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
