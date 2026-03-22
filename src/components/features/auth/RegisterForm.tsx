"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/lib/zodAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { useRouter } from "@/i18n/routing";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      username: "", 
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      role: "RANGER"
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterFormValues) => {
      const response = await apiClient.post("/dj-rest-auth/registration/", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      router.push("/dashboard");
    },
    onError: (error) => {
      form.setError("root", { message: "Clearance rejected. API payload structural conflict." });
    },
  });

  function onSubmit(data: RegisterFormValues) {
    registerMutation.mutate(data);
  }

  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-2xl transition-all hover:shadow-primary/5">
      <CardHeader className="space-y-2 text-center sm:text-left">
        <CardTitle className="text-3xl font-bold tracking-tight">Request Clearance</CardTitle>
        <CardDescription className="text-base font-medium">
          Register your physical identity to gain localized Node access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Admin ID</Label>
              <Input id="username" className="h-12 bg-background/50" placeholder="johndoe" {...register("username")} />
              {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Corporate Email</Label>
              <Input id="email" className="h-12 bg-background/50" placeholder="tech@upemba.com" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
            <Input id="name" className="h-12 bg-background/50" placeholder="John Doe" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Security Protocol</Label>
              <Input id="password" type="password" className="h-12 bg-background/50 tracking-widest" placeholder="••••••••" {...register("password")} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Confirm Key</Label>
              <Input id="passwordConfirm" type="password" className="h-12 bg-background/50 tracking-widest" placeholder="••••••••" {...register("passwordConfirm")} />
              {errors.passwordConfirm && <p className="text-sm text-destructive">{errors.passwordConfirm.message}</p>}
            </div>
          </div>
          
          {errors.root && (
            <p className="text-sm font-medium animate-pulse text-destructive bg-destructive/10 p-3 rounded-md">
              {errors.root.message}
            </p>
          )}

          <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" disabled={registerMutation.isPending}>
             {registerMutation.isPending ? "Validating Protocol..." : "Generate Handshake"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
