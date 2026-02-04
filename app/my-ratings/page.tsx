'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

export default function MyRatingsPage() {
  const [userRatings] = useState([
    {
      id: 1,
      professorName: 'John Stilgoe',
      department: 'Environmental Studies',
      school: 'Harvard University',
      rating: 1.0,
      date: 'Sep 15th, 2022',
      course: 'GSD600',
    },
    {
      id: 2,
      professorName: 'Jane Smith',
      department: 'Computer Science',
      school: 'Harvard University',
      rating: 4.2,
      date: 'Mar 10th, 2023',
      course: 'CS50',
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Ratings</h1>

        {userRatings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">You haven't submitted any ratings yet</p>
            <Link href="/rate">
              <Button className="bg-blue-600 text-white">Rate a Professor</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userRatings.map(rating => (
              <div key={rating.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <h3 className="font-bold text-lg">{rating.professorName}</h3>
                  <p className="text-sm text-gray-600">{rating.department} • {rating.school}</p>
                  <p className="text-xs text-gray-500">{rating.course} • {rating.date}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 flex items-center justify-center rounded text-2xl font-bold ${
                    rating.rating >= 3.5 ? 'bg-green-300' :
                    rating.rating >= 2.5 ? 'bg-yellow-300' :
                    rating.rating >= 1.5 ? 'bg-orange-300' :
                    'bg-red-300'
                  }`}>
                    {rating.rating.toFixed(1)}
                  </div>

                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
