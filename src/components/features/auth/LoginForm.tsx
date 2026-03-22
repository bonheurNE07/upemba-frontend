"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/zodAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useRouter } from "@/i18n/routing";

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      const response = await apiClient.post("/dj-rest-auth/login/", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      router.push("/dashboard");
    },
    onError: (error) => {
      form.setError("root", { message: "Invalid gateway credentials physically rejected by API." });
    },
  });

  function onSubmit(data: LoginFormValues) {
    loginMutation.mutate(data);
  }

  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl transition-all hover:shadow-primary/5">
      <CardHeader className="space-y-2 text-center sm:text-left">
        <CardTitle className="text-3xl font-bold tracking-tight">Access Gateway</CardTitle>
        <CardDescription className="text-base font-medium">
          Authenticate directly to the Upemba Edge Diagnostic IoT clusters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Admin ID
            </Label>
            <Input 
              id="username"
              className="h-12 bg-background/50 text-base" 
              placeholder="admin" 
              {...register("username")} 
            />
            {errors.username && (
              <p className="text-sm font-medium text-destructive">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Security Protocol
            </Label>
            <Input 
              id="password"
              className="h-12 bg-background/50 text-base tracking-widest" 
              type="password" 
              placeholder="••••••••" 
              {...register("password")} 
            />
            {errors.password && (
              <p className="text-sm font-medium text-destructive">{errors.password.message}</p>
            )}
          </div>
          
          {errors.root && (
            <p className="text-sm font-medium animate-pulse text-destructive bg-destructive/10 p-3 rounded-md">
              {errors.root.message}
            </p>
          )}

          <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" disabled={loginMutation.isPending}>
             {loginMutation.isPending ? "Validating Handshake..." : "Initialize Session"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
