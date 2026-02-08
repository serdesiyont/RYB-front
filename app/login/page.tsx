import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { LoginForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Sign in | Rate Your Professors",
  description: "Log in to manage your professor ratings and saved schools.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50">
      <Navigation />

      <main className="container mx-auto flex min-h-[calc(100vh-96px)] items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
