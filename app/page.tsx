'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useToast } from "@/app/hooks/use-toast";
import { signIn } from "next-auth/react";

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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-foreground">MVMNT</h1>
            <p className="text-sm text-muted-foreground mt-1">Financial Tracker</p>
          </div>
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Sign in with your Google account to continue
            </p>
            <Button
              onClick={handleGoogleSignIn}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;