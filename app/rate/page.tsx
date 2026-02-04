'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { professors } from '@/lib/mockData';
import Header from '@/components/Header';

export default function RatePage() {
  const [selectedProfessor, setSelectedProfessor] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [course, setCourse] = useState('');
  const [review, setReview] = useState('');
  const [attendance, setAttendance] = useState('');
  const [grade, setGrade] = useState('');
  const [textbook, setTextbook] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Rate Your Professor</h1>
          <p className="text-gray-600">Help other students make informed decisions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Professor Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-3">Select a Professor</label>
            <select
              value={selectedProfessor || ''}
              onChange={(e) => setSelectedProfessor(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Choose a professor...</option>
              {professors.map(prof => (
                <option key={prof.id} value={prof.id}>
                  {prof.name} - {prof.department}
                </option>
              ))}
            </select>
          </div>

          {selectedProfessor && (
            <>
              {/* Overall Rating */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-4">Overall Rating</label>
                <div className="flex gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-4xl"
                    >
                      {star <= (hoverRating || rating) ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  {rating === 0 ? 'Click to rate' : `You rated ${rating} stars`}
                </p>
              </div>

              {/* Difficulty Level */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-4">Difficulty Level</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={difficulty}
                  onChange={(e) => setDifficulty(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {difficulty === 0 ? 'Select difficulty' : `Difficulty: ${difficulty.toFixed(1)}`}
                </p>
              </div>

              {/* Course */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Course Code (Optional)</label>
                <Input
                  placeholder="e.g., GSD600"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>

              {/* Review Text */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">Your Review</label>
                <textarea
                  placeholder="Share your experience with this professor..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {review.length}/1000 characters
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">Attendance</label>
                  <select
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Select...</option>
                    <option value="Mandatory">Mandatory</option>
                    <option value="Not Mandatory">Not Mandatory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Grade</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Select...</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Textbook Used</label>
                  <select
                    value={textbook}
                    onChange={(e) => setTextbook(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-end">
                <Link href="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button
                  className="bg-blue-600 text-white"
                  disabled={rating === 0 || !review}
                >
                  Submit Review
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
