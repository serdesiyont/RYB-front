"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ControllerRenderProps,
  type FieldValues,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Mail, UserRound } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

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

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter the email you registered with"),
});

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

function PasswordField({
  label,
  placeholder,
  field,
  description,
}: {
  label: string;
  placeholder?: string;
  description?: string;
  field: ControllerRenderProps<FieldValues, string>;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <FormItem className="space-y-1.5">
      <FormLabel>{label}</FormLabel>
      {description ? <FormDescription>{description}</FormDescription> : null}
      <div className="relative">
        <FormControl>
          <Input
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            className="pr-10"
            {...field}
          />
        </FormControl>
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground transition hover:bg-muted"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      <FormMessage />
    </FormItem>
  );
}

function GoogleButton({ label }: { label: string }) {
  const [busy, setBusy] = useState(false);

  const GoogleMark = (
    <svg
      aria-hidden="true"
      focusable="false"
      className="size-4"
      viewBox="0 0 18 18"
    >
      <path
        d="M17.64 9.2045c0-.6395-.0573-1.2527-.1636-1.8409H9v3.4818h4.8445c-.209 1.125-.8436 2.0782-1.7973 2.7173v2.2618h2.9082c1.7018-1.5673 2.6846-3.8745 2.6846-6.62Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.4673-.8064 5.9563-2.1755l-2.9082-2.2618c-.8063.54-1.8373.8618-3.0481.8618-2.3446 0-4.3282-1.5827-5.0346-3.71H.957v2.3328C2.4382 15.9836 5.4818 18 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.9654 10.7145c-.18-.54-.2823-1.1155-.2823-1.7145 0-.5991.1023-1.1745.2823-1.7145V4.9527H.957C.3477 6.1636 0 7.5454 0 9c0 1.4546.3477 2.8364.957 4.0473l3.0084-2.3328Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.5791c1.3218 0 2.5064.4545 3.4391 1.3436l2.579-2.579C13.4636.9155 11.4264 0 9 0 5.4818 0 2.4382 2.0164.957 4.9527l3.0084 2.3328C4.6718 5.1618 6.6554 3.5791 9 3.5791Z"
        fill="#EA4335"
      />
    </svg>
  );

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full justify-center border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50"
      onClick={() => {
        setBusy(true);
        setTimeout(() => setBusy(false), 900);
      }}
      disabled={busy}
    >
      {busy ? <Loader2 className="size-4 animate-spin" /> : GoogleMark}
      <span>{label}</span>
    </Button>
  );
}

function AuthDivider() {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <Separator className="flex-1" />
      <span>or</span>
      <Separator className="flex-1" />
    </div>
  );
}

export function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(values: LoginValues) {
    setSubmitting(true);
    setStatus(null);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus(`Signed in as ${values.email}. Redirecting...`);
    setSubmitting(false);
  }

  return (
    <Card className="w-full border border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-200/70">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          Access your ratings and saved professors.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <GoogleButton label="Continue with Google" />
        <AuthDivider />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  placeholder="••••••••"
                  field={field}
                  description="At least 8 characters"
                />
              )}
            />

            <div className="flex items-center justify-between gap-3 text-sm">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Remember me</FormLabel>
                  </FormItem>
                )}
              />
              <Link
                href="/forgot-password"
                className="font-semibold text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            {status ? (
              <p className="text-center text-sm text-muted-foreground">
                {status}
              </p>
            ) : null}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        <span>New here?</span>
        <Link
          href="/signup"
          className="ml-1 font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </CardFooter>
    </Card>
  );
}

export function SignupForm() {
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
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setStatus(
      `Account created for ${
        values.name || values.email
      }. Check your inbox to verify.`
    );
    form.reset({ ...values, password: "", confirmPassword: "", terms: true });
    setSubmitting(false);
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
        <GoogleButton label="Sign up with Google" />
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
              <p className="text-center text-sm text-muted-foreground">
                {status}
              </p>
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

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(values: ForgotPasswordValues) {
    setSubmitting(true);
    setStatus(null);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus(
      `If an account exists for ${values.email}, we'll email reset instructions.`
    );
    setSubmitting(false);
  }

  return (
    <Card className="w-full border border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-200/70">
      <CardHeader>
        <CardTitle className="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          We'll email you a secure link to create a new password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel>Account email</FormLabel>
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

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending reset link
                </>
              ) : (
                "Send reset link"
              )}
            </Button>

            {status ? (
              <p className="text-center text-sm text-muted-foreground">
                {status}
              </p>
            ) : null}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground gap-2">
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Back to sign in
        </Link>
        <span aria-hidden="true">•</span>
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline"
        >
          Create account
        </Link>
      </CardFooter>
    </Card>
  );
}
