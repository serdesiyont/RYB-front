import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { ForgotPasswordForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = {
  title: "Reset password | Rate Your Professors",
  description: "Send yourself a secure password reset link.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50">
      <Navigation />

      <main className="container mx-auto flex min-h-[calc(100vh-96px)] items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl">
          <ForgotPasswordForm />
        </div>
      </main>
    </div>
  );
}
