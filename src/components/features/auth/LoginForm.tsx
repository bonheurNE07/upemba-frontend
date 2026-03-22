"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/zodAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useRouter } from "@/i18n/routing";

export function LoginForm() {
  const router = useRouter();

  // Strictly bind Zod definitions into the React Hook Form core
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Architected the TanStack Query Mutation natively hitting dj-rest-auth
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      const response = await apiClient.post("/dj-rest-auth/login/", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Proceed gracefully to the isolated Next.js Dashboard Route bridging localization paths implicitly
      router.push("/dashboard");
    },
    onError: (error) => {
      // Handle strict Django 401 Unauthorized API validation payloads
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Admin ID</FormLabel>
                  <FormControl>
                    <Input className="h-12 bg-background/50 text-base" placeholder="admin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Security Protocol</FormLabel>
                  <FormControl>
                    <Input className="h-12 bg-background/50 text-base tracking-widest" type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {form.formState.errors.root && (
              <p className="text-sm font-medium animate-pulse text-destructive bg-destructive/10 p-3 rounded-md">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" disabled={loginMutation.isPending}>
               {loginMutation.isPending ? "Validating Handshake..." : "Initialize Session"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
