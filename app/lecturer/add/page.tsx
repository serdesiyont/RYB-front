import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LecturerForm } from "@/components/lecturer/LecturerForm";

export const metadata = {
  title: "Add Lecturer",
  description: "Create a new lecturer profile",
};

export default function AddLecturerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Add a Lecturer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <LecturerForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
