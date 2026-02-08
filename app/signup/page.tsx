import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { SignupForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Create account | Rate Your Professors",
  description:
    "Join the community to rate professors, save schools, and stay organized.",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50">
      <Navigation />

      <main className="container mx-auto flex min-h-[calc(100vh-96px)] items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl">
          <SignupForm />
        </div>
      </main>
    </div>
  );
}
