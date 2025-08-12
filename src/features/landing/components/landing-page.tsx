import { Link } from "waku";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui";
import { AuthForms } from "../../auth";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">Waku Auth</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Waku Auth
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            A modern authentication example built with Waku, React Server Components, and better-auth.
            Experience the power of server-side rendering with seamless client-side interactions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🚀</span>
                <span>Fast & Modern</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Built with Waku framework for optimal performance and developer experience
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🔒</span>
                <span>Secure Auth</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Powered by better-auth for robust and secure authentication
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>⚡</span>
                <span>Server Components</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Leverage React Server Components for better performance and SEO
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Auth Section */}
        <div className="mt-16 max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Get Started</CardTitle>
              <CardDescription className="text-center">
                Sign in to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuthForms />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2025 Waku Auth Example. Built with ❤️ using Waku framework.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
