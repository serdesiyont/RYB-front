'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { schools } from '@/lib/mockData';

export default function SchoolRatingPage() {
  const [selectedSchool, setSelectedSchool] = useState<number | null>(null);
  const [ratings, setRatings] = useState({
    reputation: 0,
    location: 0,
    opportunities: 0,
    facilities: 0,
    internet: 0,
    safety: 0,
    food: 0,
    clubs: 0,
    happiness: 0,
    social: 0,
  });
  const [review, setReview] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const selectedSchoolData = selectedSchool ? schools.find(s => s.id === selectedSchool) : null;

  const handleRatingChange = (category: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        {selectedSchoolData && (
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-2">{selectedSchoolData.location}</p>
            <h1 className="text-4xl font-bold mb-1">{selectedSchoolData.name}</h1>
            <p className="text-lg text-gray-600">Add Rating</p>
          </div>
        )}

        {!selectedSchoolData ? (
          <div className="bg-white rounded-lg p-6 mb-6">
            <label className="block text-sm font-semibold mb-3">Select School</label>
            <select
              value={selectedSchool || ''}
              onChange={(e) => setSelectedSchool(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Choose a school...</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            {/* Reputation */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">
                Reputation <span className="text-red-500">*</span>
              </h2>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => handleRatingChange('reputation', level)}
                    className={`w-12 h-12 rounded-lg transition ${
                      level <= ratings.reputation ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 - Awful</span>
                <span>5 - Awesome</span>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">
                Location <span className="text-red-500">*</span>
              </h2>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => handleRatingChange('location', level)}
                    className={`w-12 h-12 rounded-lg transition ${
                      level <= ratings.location ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 - Awful</span>
                <span>5 - Awesome</span>
              </div>
            </div>

            {/* Opportunities */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">
                Opportunities <span className="text-red-500">*</span>
              </h2>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => handleRatingChange('opportunities', level)}
                    className={`w-12 h-12 rounded-lg transition ${
                      level <= ratings.opportunities ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 - Awful</span>
                <span>5 - Awesome</span>
              </div>
            </div>

            {/* Facilities and common areas */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">
                Facilities and common areas <span className="text-red-500">*</span>
              </h2>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => handleRatingChange('facilities', level)}
                    className={`w-12 h-12 rounded-lg transition ${
                      level <= ratings.facilities ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 - Awful</span>
                <span>5 - Awesome</span>
              </div>
            </div>

            {/* Internet */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">
                Internet <span className="text-red-500">*</span>
              </h2>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => handleRatingChange('internet', level)}
                    className={`w-12 h-12 rounded-lg transition ${
                      level <= ratings.internet ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 - Awful</span>
                <span>5 - Awesome</span>
              </div>
            </div>

            {/* Write a Review */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-3">
                Write a Review
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Discuss your personal experience on this school. What's great about it? What could use improvement?
              </p>

              {/* Guidelines */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg font-bold">ℹ</span>
                  <div>
                    <button className="font-semibold text-sm mb-2 hover:underline">Guidelines</button>
                    <ul className="text-sm text-gray-700 space-y-1 hidden">
                      <li>• Your rating could be removed if you use profanity or derogatory terms.</li>
                      <li>• Refer to the rating categories to help you better elaborate your comments.</li>
                      <li>• Don't forget to proof read!</li>
                    </ul>
                    <button className="text-sm text-blue-600 hover:underline">View all guidelines</button>
                  </div>
                </div>
              </div>

              <textarea
                placeholder="What do you want other students to know about this school?"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                maxLength={350}
                rows={8}
                className="w-full border border-blue-300 rounded px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="text-right text-sm text-gray-600 mt-1">
                {review.length}/350
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white rounded-lg p-6 mb-6 text-center text-sm">
              <p className="mb-3">
                By clicking the "Submit" button, I acknowledge that I have read and agreed to the Rate My Professors{' '}
                <Link href="#" className="text-blue-600 hover:underline">Site Guidelines</Link>,{' '}
                <Link href="#" className="text-blue-600 hover:underline">Terms of Use</Link> and{' '}
                <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>. Submitted data becomes the property of Rate My Professors.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mb-8">
              <Button className="bg-gray-500 hover:bg-gray-600 text-white rounded-full px-12 py-3">
                Submit Rating
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
