"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();
  const showNavigation = pathname !== "/";

  return (
    <div className="min-h-screen bg-background">
      {showNavigation && <Navigation />}
      <main className={showNavigation ? "pt-16 pb-8" : ""}>
        {children}
      </main>
    </div>
  );
};