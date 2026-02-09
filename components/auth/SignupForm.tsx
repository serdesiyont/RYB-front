"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Mail, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import {
  AuthDivider,
  GoogleButton,
  PasswordField,
} from "@/components/auth/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Use 8 or more characters")
      .regex(/^(?=.*[A-Z])(?=.*\d).+$/, "Add a capital letter and a number"),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You need to accept the terms to continue" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignupValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(values: SignupValues) {
    setSubmitting(true);
    setStatus(null);
    
    try {
      const { data, error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (error) {
        setStatus(error.message || "Failed to create account. Please try again.");
        setSubmitting(false);
        return;
      }

      // Send verification email
      try {
        await authClient.sendVerificationEmail({
          email: values.email,
        });
        
        setStatus(
          `Account created successfully! Please check your email inbox (${values.email}) to verify your account before signing in.`
        );
      } catch (emailError) {
        // Account created but email failed - still show success
        setStatus(
          `Account created successfully! You may need to verify your email before signing in. Check your inbox at ${values.email}.`
        );
      }
      
      // Don't auto-redirect, let user read the verification message
      setSubmitting(false);
    } catch (err) {
      setStatus("An unexpected error occurred. Please try again.");
      setSubmitting(false);
    }
  }

  async function handleGoogleSignUp() {
    setSubmitting(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setStatus("Failed to sign up with Google. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <Card className="w-full border border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-200/70">
      <CardHeader>
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          Sign up to rate professors and track your favorites.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <GoogleButton label="Sign up with Google" onClick={handleGoogleSignUp} disabled={submitting} />
        <AuthDivider />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Alex Johnson"
                        className="pl-10"
                        autoComplete="name"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        autoComplete="email"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <PasswordField
                  label="Password"
                  placeholder="Create a password"
                  description="Use at least 8 characters with a number and capital letter"
                  field={field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <PasswordField
                  label="Confirm password"
                  placeholder="Re-enter your password"
                  field={field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-start gap-3 space-y-0 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(Boolean(checked))
                      }
                    />
                  </FormControl>
                  <div className="space-y-1 leading-tight text-sm">
                    <FormLabel className="font-semibold">
                      Agree to the basics
                    </FormLabel>
                    <FormDescription className="text-xs text-muted-foreground">
                      By creating an account you accept our Terms, Privacy
                      Policy, and community guidelines.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating account
                </>
              ) : (
                "Create account"
              )}
            </Button>

            {status ? (
              <div className="text-center text-sm">
                <p className={status.includes("successfully") ? "text-green-600 font-medium" : "text-muted-foreground"}>
                  {status}
                </p>
                {status.includes("verify your email") && (
                  <Link 
                    href="/login" 
                    className="mt-2 inline-block text-primary hover:underline font-semibold"
                  >
                    Go to login
                  </Link>
                )}
              </div>
            ) : null}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        <span>Already have an account?</span>
        <Link
          href="/login"
          className="ml-1 font-semibold text-primary hover:underline"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
