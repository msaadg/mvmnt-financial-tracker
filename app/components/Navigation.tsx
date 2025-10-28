"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/app/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { LayoutDashboard, DollarSign, CreditCard, BarChart3, LogOut, Wallet, Menu, Users } from "lucide-react";
import { useState } from "react";
import { signOut, SessionProvider, useSession } from "next-auth/react";
import { useToast } from "@/app/hooks/use-toast";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Donations", href: "/donations", icon: DollarSign },
  { name: "Expenses", href: "/expenses", icon: CreditCard },
  { name: "Funds Management", href: "/funds", icon: Wallet },
  { name: "Analytics & Ledger", href: "/analytics", icon: BarChart3 },
  // ... admin-only "User Management" will be rendered conditionally inside NavContent ...
];

export const Navigation = () => {
  // Wrap the session-using content in a provider.
  return (
    <SessionProvider>
      <NavContent />
    </SessionProvider>
  );
};

// New inner component that actually uses session hooks
function NavContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const isAdmin = !!(session?.user as any)?.role && (session?.user as any).role === "admin";

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      // Sign out via next-auth and then redirect to sign-in (root)
      await signOut({ redirect: false, callbackUrl: "/" });
      toast({
        title: "Signed out",
        description: "You have been signed out.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                MVMNT
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span className="hidden xl:inline">{item.name}</span>
                  <span className="xl:hidden">{item.name.split(' ')[0]}</span>
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === "/admin"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden xl:inline">Admin</span>
                <span className="xl:hidden">Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile Navigation & User Menu */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="text-xl font-bold text-foreground mb-4">
                    MVMNT
                  </div>
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        pathname === "/admin"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <Users className="mr-3 h-5 w-5" />
                      Admin
                    </Link>
                  )}
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full justify-start px-4 py-3 text-sm font-medium"
                      disabled={isLoggingOut}
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      {isLoggingOut ? "Signing out..." : "Log Out"}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                      {(session?.user?.name || session?.user?.email || "U")
                        .toString()
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sm">{session?.user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{session?.user?.email || ""}</p>
                    {isAdmin && <p className="text-xs text-muted-foreground">Role: admin</p>}
                  </div>
                </div>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer" disabled={isLoggingOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {isLoggingOut ? "Signing out..." : "Log Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}