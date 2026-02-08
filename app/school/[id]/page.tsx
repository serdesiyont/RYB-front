import Link from "next/link";
import { Button } from "@/components/ui/button";
import { schools, professors, reviews } from "@/lib/mockData";
import Header from "@/components/Header";
import SchoolRatingsGrid from "@/components/SchoolRatingsGrid";
import ReviewCard from "@/components/ReviewCard";

interface SchoolPageProps {
  params: Promise<{ id: string }>;
}

export default async function SchoolPage({ params }: SchoolPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  const school = schools.find((s) => s.id === numericId);
  const schoolProfessors = professors.filter((p) => p.schoolId === numericId);
  const schoolReviews = reviews.filter((r) => r.schoolId === numericId);

  if (!school) {
    return <div className="p-4">School not found</div>;
  }

  const tagCounts: Record<string, number> = {};
  schoolReviews.forEach((review) => {
    review.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag]) => tag);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* School Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{school.name}</h1>
          <p className="text-gray-600 mb-2">{school.location}</p>
          <Link href="#" className="text-blue-600 underline text-sm">
            View all Professors
          </Link>

          {topTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {topTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-200 px-3 py-1 font-semibold text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-12">
          <Button className="bg-black text-white rounded-full">Rate</Button>
          <Button
            variant="outline"
            className="rounded-full border-black bg-transparent"
          >
            Compare
          </Button>
        </div>

        {/* Ratings Grid */}
        <div className="mb-12">
          <SchoolRatingsGrid school={school} />
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {schoolReviews.length} Ratings
          </h2>
          <div className="space-y-4">
            {schoolReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                isSchoolReview={true}
              />
            ))}
          </div>
          {schoolReviews.length > 5 && (
            <div className="flex justify-center mt-8">
              <Button className="bg-black text-white rounded-full px-8">
                Load More Ratings
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
