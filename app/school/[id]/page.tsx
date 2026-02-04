'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { schools, professors, reviews } from '@/lib/mockData';
import Header from '@/components/Header';
import SchoolRatingsGrid from '@/components/SchoolRatingsGrid';
import ReviewCard from '@/components/ReviewCard';

export default function SchoolPage({ params }: { params: { id: string } }) {
  const school = schools.find(s => s.id === parseInt(params.id));
  const schoolProfessors = professors.filter(p => p.schoolId === parseInt(params.id));
  const schoolReviews = reviews.filter(r => r.schoolId === parseInt(params.id));

  if (!school) {
    return <div className="p-4">School not found</div>;
  }

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
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-12">
          <Button className="bg-black text-white rounded-full">Rate</Button>
          <Button variant="outline" className="rounded-full border-black bg-transparent">Compare</Button>
        </div>

        {/* Ratings Grid */}
        <div className="mb-12">
          <SchoolRatingsGrid school={school} />
        </div>

        {/* Video Section */}
        <div className="mb-12 bg-gray-900 rounded-lg p-4 aspect-video flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white text-lg font-semibold mb-4">Cheddar News Live Feed</h3>
            <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{schoolReviews.length} Ratings</h2>
          <div className="space-y-4">
            {schoolReviews.map(review => (
              <ReviewCard key={review.id} review={review} isSchoolReview={true} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
