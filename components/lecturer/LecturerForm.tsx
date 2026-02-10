"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createLecturer } from "@/lib/api/lecturers";

const lecturerSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  university: z.string().trim().min(2, "University is required"),
  department: z.string().trim().min(2, "Department is required"),
  courses: z.array(z.string().trim().min(1, "Course name cannot be empty")).min(1, "Add at least one course"),
});

export type LecturerFormValues = z.infer<typeof lecturerSchema>;

export function LecturerForm() {
  const router = useRouter();
  const form = useForm<LecturerFormValues>({
    resolver: zodResolver(lecturerSchema),
    defaultValues: {
      name: "",
      university: "",
      department: "",
      courses: [],
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [courseInput, setCourseInput] = useState("");

  const courses = form.watch("courses");

  const addCourse = () => {
    const value = courseInput.trim();
    if (!value) return;
    if (courses.includes(value)) {
      setCourseInput("");
      return;
    }
    form.setValue("courses", [...courses, value], { shouldValidate: true });
    setCourseInput("");
  };

  const removeCourse = (name: string) => {
    form.setValue(
      "courses",
      courses.filter((c) => c !== name),
      { shouldValidate: true }
    );
  };

  async function onSubmit(values: LecturerFormValues) {
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await createLecturer(values);
      setStatus(res.message || "Lecturer created successfully");
      form.reset({ name: "", university: "", department: "", courses: [] });
      router.refresh();
    } catch (err: any) {
      setStatus(err?.message || "Failed to create lecturer. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lecturer name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Dr. Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Stanford University" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="courses"
          render={() => (
            <FormItem>
              <FormLabel>Courses</FormLabel>
              <FormDescription>Add at least one course taught by this lecturer.</FormDescription>
              <div className="flex gap-2">
                <Input
                  value={courseInput}
                  onChange={(e) => setCourseInput(e.target.value)}
                  placeholder="e.g., CS229"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCourse();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addCourse}>
                  <Plus className="size-4" />
                  <span className="ml-1">Add</span>
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {courses.map((course) => (
                  <span
                    key={course}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {course}
                    <button
                      type="button"
                      onClick={() => removeCourse(course)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={`Remove ${course}`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span className="ml-2">Creating...</span>
              </>
            ) : (
              "Create lecturer"
            )}
          </Button>
          {status ? (
            <p className="text-sm text-muted-foreground sm:text-right">{status}</p>
          ) : null}
        </div>
      </form>
    </Form>
  );
}
