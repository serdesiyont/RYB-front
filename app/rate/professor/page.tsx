'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { professors, schools } from '@/lib/mockData';

const TAGS = [
  'Tough Grader', 'Get Ready To Read', 'Participation Matters', 'Extra Credit',
  'Group Projects', 'Amazing Lectures', 'Clear Grading Criteria', 'Gives Good Feedback',
  'Inspirational', 'Lots Of Homework', 'Hilarious', 'Beware Of Pop Quizzes',
  'So Many Papers', 'Caring', 'Respected', 'Lecture Heavy', 'Test Heavy',
  'Graded By Few Things', 'Accessible Outside Class', 'Online Savvy'
];

export default function ProfessorRatingPage() {
  const [selectedProfessor, setSelectedProfessor] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState(3);
  const [retake, setRetake] = useState<'yes' | 'no' | null>(null);
  const [courseCode, setCourseCode] = useState('');
  const [isOnlineCourse, setIsOnlineCourse] = useState(false);
  const [textbook, setTextbook] = useState<'yes' | 'no' | null>(null);
  const [attendance, setAttendance] = useState<'mandatory' | 'optional' | null>(null);
  const [credit, setCredit] = useState<'yes' | 'no' | null>(null);
  const [grade, setGrade] = useState('');
  const [review, setReview] = useState('');

  const selectedProf = selectedProfessor ? professors.find(p => p.id === selectedProfessor) : null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        {selectedProf && (
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-2">Cambridge, MA</p>
            <h1 className="text-4xl font-bold mb-1">{selectedProf.name}</h1>
            <p className="text-lg text-gray-600 mb-3">Add Rating</p>
            <p className="text-sm">
              <span className="font-semibold">{selectedProf.department}</span> • 
              <Link href={`/school/${selectedProf.schoolId}`} className="text-blue-600 hover:underline ml-1">
                {schools.find(s => s.id === selectedProf.schoolId)?.name || 'University'}
              </Link>
            </p>
          </div>
        )}

        {!selectedProf ? (
          <div className="bg-white rounded-lg p-6 mb-6">
            <label className="block text-sm font-semibold mb-3">Select Professor</label>
            <select
              value={selectedProfessor || ''}
              onChange={(e) => setSelectedProfessor(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Choose a professor...</option>
              {professors.map(prof => (
                <option key={prof.id} value={prof.id}>
                  {prof.name} - {prof.department}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            {/* Select up to 3 tags */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">Select up to 3 tags</h2>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedTags.includes(tag)
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } ${selectedTags.length >= 3 && !selectedTags.includes(tag) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={selectedTags.length >= 3 && !selectedTags.includes(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Course Code */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">Select Course Code</h2>
              <div className="mb-4">
                <select
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                >
                  <option value="">Select Course Code</option>
                  <option value="GSD600">GSD600</option>
                  <option value="GSD601">GSD601</option>
                  <option value="GSD602">GSD602</option>
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOnlineCourse}
                  onChange={(e) => setIsOnlineCourse(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="text-sm">This is an online course</span>
              </label>
            </div>

            {/* Rate your professor */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">
                Rate your professor <span className="text-red-500">*</span>
              </h2>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-12 h-12 rounded-lg transition ${
                      star <= rating ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 - Awful</span>
                <span>5 - Awesome</span>
              </div>
            </div>

            {/* How difficult */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">
                How difficult was this professor? <span className="text-red-500">*</span>
              </h2>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(level => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`w-12 h-12 rounded-lg transition ${
                      level === difficulty ? 'bg-gray-400' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>1 - Very Easy</span>
                <span>5 - Very Difficult</span>
              </div>
            </div>

            {/* Would you take again */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">
                Would you take this professor again? <span className="text-red-500">*</span>
              </h2>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setRetake('yes')}
                  className={`w-16 h-16 rounded-full border-4 transition ${
                    retake === 'yes' ? 'border-gray-600 bg-gray-100' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                <button
                  onClick={() => setRetake('no')}
                  className={`w-16 h-16 rounded-full border-4 transition ${
                    retake === 'no' ? 'border-gray-600 bg-gray-100' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              <div className="flex justify-center gap-32 text-sm mt-2">
                <span>Yes</span>
                <span>No</span>
              </div>
            </div>

            {/* Was this class taken for credit */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">Was this class taken for credit?</h2>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setCredit('yes')}
                  className={`w-16 h-16 rounded-full border-4 transition ${
                    credit === 'yes' ? 'border-gray-600 bg-gray-100' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                <button
                  onClick={() => setCredit('no')}
                  className={`w-16 h-16 rounded-full border-4 transition ${
                    credit === 'no' ? 'border-gray-600 bg-gray-100' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              <div className="flex justify-center gap-32 text-sm mt-2">
                <span>Yes</span>
                <span>No</span>
              </div>
            </div>

            {/* Did this professor use textbooks */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">Did this professor use textbooks?</h2>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setTextbook('yes')}
                  className={`w-16 h-16 rounded-full border-4 transition ${
                    textbook === 'yes' ? 'border-gray-600 bg-gray-100' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                <button
                  onClick={() => setTextbook('no')}
                  className={`w-16 h-16 rounded-full border-4 transition ${
                    textbook === 'no' ? 'border-gray-600 bg-gray-100' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              <div className="flex justify-center gap-32 text-sm mt-2">
                <span>Yes</span>
                <span>No</span>
              </div>
            </div>

            {/* Was attendance mandatory */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">Was attendance mandatory?</h2>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setAttendance('mandatory')}
                  className={`w-16 h-16 rounded-full border-4 transition ${
                    attendance === 'mandatory' ? 'border-gray-600 bg-gray-100' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                <button
                  onClick={() => setAttendance('optional')}
                  className={`w-16 h-16 rounded-full border-4 transition ${
                    attendance === 'optional' ? 'border-gray-600 bg-gray-100' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
              </div>
              <div className="flex justify-center gap-32 text-sm mt-2">
                <span>Yes</span>
                <span>No</span>
              </div>
            </div>

            {/* Select grade received */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-4">Select grade received</h2>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="">Select grade</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D">D</option>
                <option value="F">F</option>
                <option value="N/A">N/A</option>
              </select>
            </div>

            {/* Write a Review */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="font-semibold mb-3">
                Write a Review <span className="text-red-500">*</span>
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Discuss the professor's professional abilities including teaching style and ability to convey the material clearly
              </p>

              {/* Guidelines */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg font-bold">ℹ</span>
                  <div>
                    <button className="font-semibold text-sm mb-2 hover:underline">Guidelines</button>
                    <ul className="text-sm text-gray-700 space-y-1 hidden">
                      <li>• Your rating could be removed if you use profanity or derogatory terms.</li>
                      <li>• Don't claim that the professor shows bias or favoritism for or against students.</li>
                      <li>• Don't forget to proof read!</li>
                    </ul>
                    <button className="text-sm text-blue-600 hover:underline">View all guidelines</button>
                  </div>
                </div>
              </div>

              <textarea
                placeholder="What do you want other students to know about this professor?"
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
