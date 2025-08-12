"use client";

import { useRef, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../../../shared/components/ui";
import { SignOutLink } from "../../auth";
import { Link, useRouter } from "waku";
import { getNavigationItems } from "../../../shared/config/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  userGreeting?: string;
}

export const DashboardLayout = ({ 
  children, 
  currentPath = "/",
  userGreeting = undefined
}: DashboardLayoutProps) => {
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  // Get navigation items from data-driven config
  const navigationItems = getNavigationItems("dashboard");

  // Focus management for route changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.focus();
    }
  }, [currentPath]);

  const handleSkipToMain = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (mainRef.current) {
      mainRef.current.focus();
    }
  };

  return (
    <SidebarProvider>
      {/* Skip to main content link for screen readers */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        onKeyDown={(e) => e.key === 'Enter' && handleSkipToMain(e)}
      >
        Skip to main content
      </a>
      
      <div className="flex h-screen w-full">
        <Sidebar role="navigation" aria-label="Main navigation">
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
              <h2 className="text-lg font-semibold">Waku Auth</h2>
            </div>
            {userGreeting && (
              <div className="px-4 pb-2">
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  {userGreeting}
                </p>
              </div>
            )}
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu role="list">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.href} role="listitem">
                      <SidebarMenuButton 
                        asChild 
                        isActive={currentPath === item.href}
                        aria-current={currentPath === item.href ? "page" : undefined}
                      >
                        <Link 
                          to={item.href}
                          aria-label={item.ariaLabel}
                        >
                          <span className="mr-2" aria-hidden="true">{item.icon}</span>
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4">
              <SignOutLink />
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4" role="banner">
            <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
            <div className="ml-auto">
              <span className="text-sm text-muted-foreground">Dashboard</span>
            </div>
          </header>
          
          <main 
            id="main-content"
            ref={mainRef}
            className="flex-1 overflow-auto p-6"
            role="main"
            tabIndex={-1}
            aria-label="Main dashboard content"
          >
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
