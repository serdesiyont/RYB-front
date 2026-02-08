import { NextResponse } from "next/server";
import { professors, reviews, schools } from "@/lib/mockData";

export async function GET(
  _req: Request,
  { params }: { params: { type: string; id: string } }
) {
  const id = parseInt(params.id, 10);
  const kind = params.type.toLowerCase();

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  if (kind === "school" || kind === "schools") {
    const school = schools.find((s) => s.id === id);
    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    const schoolReviews = reviews.filter((r) => r.schoolId === id);

    return NextResponse.json({
      type: "school",
      id: school.id,
      name: school.name,
      location: school.location,
      averageRating: school.averageRating,
      totalRatings: school.totalRatings,
      ratingsBreakdown: school.ratings,
      sampleReviews: schoolReviews.slice(0, 3),
    });
  }

  if (kind === "professor" || kind === "professors") {
    const professor = professors.find((p) => p.id === id);
    if (!professor) {
      return NextResponse.json(
        { error: "Professor not found" },
        { status: 404 }
      );
    }

    const professorReviews = reviews.filter((r) => r.professorId === id);

    return NextResponse.json({
      type: "professor",
      id: professor.id,
      name: professor.name,
      department: professor.department,
      schoolId: professor.schoolId,
      schoolName: professor.schoolName,
      averageRating: professor.averageRating,
      totalRatings: professor.totalRatings,
      wouldTakeAgain: professor.wouldTakeAgain,
      difficultyLevel: professor.difficultyLevel,
      sampleReviews: professorReviews.slice(0, 3),
    });
  }

  return NextResponse.json({ error: "Unsupported type" }, { status: 400 });
}
