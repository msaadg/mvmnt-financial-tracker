'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/app/components/ui/card";
import { useToast } from "@/app/hooks/use-toast";
import { signIn } from "next-auth/react";
import { Loader2, BarChart3, DollarSign, TrendingUp, Shield } from "lucide-react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        toast({
          title: "Sign in failed",
          description: res.error,
          variant: "destructive",
        });
      } else {
        const dest = res?.url || "/dashboard";
        router.push(dest);
      }
    } catch {
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 flex-col justify-between text-primary-foreground">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <BarChart3 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">MVMNT</h1>
              <p className="text-sm text-primary-foreground/80">Financial Tracker</p>
            </div>
          </div>
          
          <div className="space-y-8 mt-16">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Track Every Transaction</h3>
                <p className="text-sm text-primary-foreground/70">Monitor donations and expenses in real-time with detailed insights</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Powerful Analytics</h3>
                <p className="text-sm text-primary-foreground/70">Visualize your financial data with comprehensive reports and charts</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure & Reliable</h3>
                <p className="text-sm text-primary-foreground/70">Your data is protected with enterprise-grade security</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-primary-foreground/60">
          © 2025 MVMNT. All rights reserved.
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MVMNT</h1>
              <p className="text-xs text-muted-foreground">Financial Tracker</p>
            </div>
          </div>

          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-3 pb-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
                <CardDescription className="text-base">
                  Sign in to your account to continue
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sign In Button */}
              <Button
                onClick={handleGoogleSignIn}
                className="w-full h-12 text-base font-medium relative overflow-hidden group"
                disabled={isLoading}
                size="lg"
              >
                <div className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </div>
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Secure sign in
                  </span>
                </div>
              </div>

              {/* Info Text */}
              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
                <p className="text-xs text-muted-foreground">
                  🔒 Your data is encrypted and secure
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Features */}
          <div className="lg:hidden mt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground">Track donations & expenses</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground">Powerful analytics dashboard</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <span className="text-muted-foreground">Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;