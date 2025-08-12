"use client";

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
import { Link } from "waku";

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
  const navigationItems = [
    {
      title: "Home",
      href: "/dashboard" as const,
      icon: "🏠",
    },
    {
      title: "Counter",
      href: "/dashboard/counter" as const,
      icon: "🔢",
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
              <h2 className="text-lg font-semibold">Waku Auth</h2>
            </div>
            {userGreeting && (
              <div className="px-4 pb-2">
                <p className="text-sm text-muted-foreground">{userGreeting}</p>
              </div>
            )}
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={currentPath === item.href}>
                        <Link to={item.href}>
                          <span className="mr-2">{item.icon}</span>
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
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="ml-auto">
              <span className="text-sm text-muted-foreground">Dashboard</span>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
