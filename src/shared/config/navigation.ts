export interface NavigationItem {
  title: string;
  href: "/dashboard" | "/dashboard/counter" | "/about" | "/" | "/shadcn-demo";
  icon: string;
  ariaLabel: string;
  description?: string;
}

export const dashboardNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: "🏠",
    ariaLabel: "Go to dashboard home",
    description: "Main dashboard overview",
  },
  {
    title: "Counter",
    href: "/dashboard/counter",
    icon: "🔢",
    ariaLabel: "Go to counter demo",
    description: "Interactive counter demonstration",
  },
];

export const publicNavigation: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    icon: "🏠",
    ariaLabel: "Go to home page",
  },
  {
    title: "About",
    href: "/about",
    icon: "ℹ️",
    ariaLabel: "Learn about this application",
  },
];

// Helper function to get navigation items based on context
export function getNavigationItems(context: "dashboard" | "public"): NavigationItem[] {
  switch (context) {
    case "dashboard":
      return dashboardNavigation;
    case "public":
      return publicNavigation;
    default:
      return [];
  }
}
