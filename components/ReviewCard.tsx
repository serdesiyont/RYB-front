"use client";

import { useState } from "react";
import type { Review } from "@/lib/types";

interface ReviewCardProps {
  review: Review;
  isSchoolReview?: boolean;
}

export default function ReviewCard({
  review,
  isSchoolReview,
}: ReviewCardProps) {
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
    if (rating >= 4) return "bg-green-300";
    if (rating >= 3) return "bg-yellow-300";
    if (rating >= 2) return "bg-pink-400";
    return "bg-red-500 text-white";
  };

  const bucketColor = (value: number) => {
    if (value < 2) return "bg-red-500";
    if (value < 3) return "bg-pink-400";
    if (value < 4) return "bg-yellow-300";
    return "bg-green-300";
  };

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    const suffix = (() => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    })();

    return `${month} ${day}${suffix}, ${year}`;
  };

  const schoolCategoryEntries = review.schoolRatings
    ? [
        { label: "Reputation", value: review.schoolRatings.reputation },
        { label: "Location", value: review.schoolRatings.location },
        { label: "Opportunities", value: review.schoolRatings.opportunities },
        { label: "Facilities", value: review.schoolRatings.facilities },
        { label: "Internet", value: review.schoolRatings.internet },
        { label: "Safety", value: review.schoolRatings.safety },
        { label: "Food", value: review.schoolRatings.food },
        { label: "Clubs", value: review.schoolRatings.clubs },
        { label: "Happiness", value: review.schoolRatings.happiness },
        { label: "Social", value: review.schoolRatings.social },
      ]
    : [];

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex gap-6">
        {/* Rating Box */}
        <div className="flex flex-col items-center gap-3 w-24">
          <div
            className={`${getRatingColor(
              review.rating
            )} text-black font-bold w-20 h-20 flex items-center justify-center text-3xl rounded`}
          >
            {review.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {!isSchoolReview ? (
            <div className="flex justify-between items-start gap-3">
              <div className="flex flex-wrap gap-3 text-sm text-gray-800">
                {review.course && (
                  <span>
                    Course:{" "}
                    <span className="font-semibold">{review.course}</span>
                  </span>
                )}
                {review.attendance && (
                  <span>
                    Attendance:{" "}
                    <span className="font-semibold">{review.attendance}</span>
                  </span>
                )}
                {review.grade && (
                  <span>
                    Grade: <span className="font-semibold">{review.grade}</span>
                  </span>
                )}
                {review.textbook && (
                  <span>
                    Textbook:{" "}
                    <span className="font-semibold">{review.textbook}</span>
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {formatDate(review.date)}
              </span>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <blockquote className="flex-1 text-gray-800 text-lg font-semibold leading-relaxed bg-gray-50 border-l-4 border-gray-200 px-4 py-3 rounded-r">
                {review.text}
              </blockquote>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {formatDate(review.date)}
              </span>
            </div>
          )}

          {!isSchoolReview && (
            <blockquote className="text-gray-800 text-lg font-semibold leading-relaxed bg-gray-50 border-l-4 border-gray-200 px-4 py-3 rounded-r">
              {review.text}
            </blockquote>
          )}

          {review.tags && review.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {review.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {isSchoolReview && schoolCategoryEntries.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {schoolCategoryEntries.map((entry) => {
                const filled = Math.round(entry.value);
                return (
                  <div key={entry.label} className="flex items-center gap-3">
                    <span className="w-24 text-gray-700 font-medium">
                      {entry.label}
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-4 w-6 rounded ${
                            level <= filled
                              ? bucketColor(entry.value)
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="min-w-[2.5rem] text-right font-semibold text-gray-800">
                      {entry.value.toFixed(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 mt-6 border-t">
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
