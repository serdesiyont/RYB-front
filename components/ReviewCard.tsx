'use client';

import { useState } from 'react';
import { Review } from '@/lib/mockData';

interface ReviewCardProps {
  review: Review;
  isSchoolReview?: boolean;
}

export default function ReviewCard({ review, isSchoolReview }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpfulCount);
  const [notHelpful, setNotHelpful] = useState(review.notHelpfulCount);
  const [helpfulClicked, setHelpfulClicked] = useState(false);
  const [notHelpfulClicked, setNotHelpfulClicked] = useState(false);

  const handleHelpful = () => {
    if (!helpfulClicked) {
      setHelpful(helpful + 1);
      setHelpfulClicked(true);
      if (notHelpfulClicked) {
        setNotHelpful(notHelpful - 1);
        setNotHelpfulClicked(false);
      }
    }
  };

  const handleNotHelpful = () => {
    if (!notHelpfulClicked) {
      setNotHelpful(notHelpful + 1);
      setNotHelpfulClicked(true);
      if (helpfulClicked) {
        setHelpful(helpful - 1);
        setHelpfulClicked(false);
      }
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-300';
    if (rating >= 3) return 'bg-yellow-300';
    if (rating >= 2) return 'bg-orange-300';
    return 'bg-red-300';
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex gap-4 mb-4">
        {/* Rating Box */}
        <div className={`${getRatingColor(review.rating)} text-black font-bold w-20 h-20 flex items-center justify-center text-3xl rounded`}>
          {review.rating.toFixed(1)}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">{isSchoolReview ? 'Overall' : 'Overall'}</h3>
              {review.course && <p className="text-sm text-gray-600">{review.course}</p>}
            </div>
            <span className="text-sm text-gray-600">{review.date}</span>
          </div>

          {/* Difficulty and Quality */}
          {(review.quality || review.difficulty) && (
            <div className="flex gap-6 mb-3 text-sm">
              {review.quality && (
                <span className="text-gray-700">Quality: <span className="font-semibold">{review.quality.toFixed(1)}</span></span>
              )}
              {review.difficulty && (
                <span className="text-gray-700">Difficulty: <span className="font-semibold">{review.difficulty.toFixed(1)}</span></span>
              )}
            </div>
          )}

          {/* Course Info */}
          {(review.attendance || review.grade || review.textbook) && (
            <div className="text-xs text-gray-600 mb-3">
              {review.course && <span>Course: {review.course}</span>}
              {review.attendance && <span> • Attendance: {review.attendance}</span>}
              {review.grade && <span> • Grade: {review.grade}</span>}
              {review.textbook && <span> • Textbook: {review.textbook}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>

      {/* Category Ratings */}
      {review.quality && (
        <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Reputation</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-4 h-4 ${i < Math.round(review.quality!) ? 'bg-yellow-300' : 'bg-gray-300'}`}/>
              ))}
            </div>
          </div>
          {review.difficulty && (
            <div>
              <p className="font-semibold mb-2">Food</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-4 h-4 ${i < Math.round(review.difficulty!) ? 'bg-red-300' : 'bg-gray-300'}`}/>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Helpful</span>
          <button
            onClick={handleHelpful}
            className="flex items-center gap-1 text-sm hover:text-blue-600"
          >
            👍 {helpful}
          </button>
          <button
            onClick={handleNotHelpful}
            className="flex items-center gap-1 text-sm hover:text-red-600"
          >
            👎 {notHelpful}
          </button>
        </div>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-600">📤</button>
          <button className="text-gray-400 hover:text-gray-600">🚩</button>
        </div>
      </div>
    </div>
  );
}
