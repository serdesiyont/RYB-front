'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { schools, professors } from '@/lib/mockData';
import Header from '@/components/Header';

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'professors' | 'schools'>('professors');

  const filteredProfessors = professors.filter(prof =>
    prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prof.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Browse</h1>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <Input
            placeholder="Search professors or schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('professors')}
            className={`px-4 py-2 font-semibold border-b-2 ${
              activeTab === 'professors'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Professors ({filteredProfessors.length})
          </button>
          <button
            onClick={() => setActiveTab('schools')}
            className={`px-4 py-2 font-semibold border-b-2 ${
              activeTab === 'schools'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Schools ({filteredSchools.length})
          </button>
        </div>

        {/* Professors Grid */}
        {activeTab === 'professors' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProfessors.map(prof => (
              <Link
                key={prof.id}
                href={`/professor/${prof.id}`}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{prof.name}</h3>
                    <p className="text-sm text-gray-600">{prof.department}</p>
                  </div>
                  <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-lg">
                    {prof.averageRating.toFixed(1)}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{prof.schoolName}</p>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{prof.totalRatings} ratings</span>
                  <span>{(prof.wouldTakeAgain * 100).toFixed(0)}% would take again</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Schools Grid */}
        {activeTab === 'schools' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchools.map(school => (
              <Link
                key={school.id}
                href={`/school/${school.id}`}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{school.name}</h3>
                    <p className="text-sm text-gray-600">{school.location}</p>
                  </div>
                  <div className="bg-yellow-300 text-black px-3 py-1 rounded font-bold text-lg">
                    {school.averageRating.toFixed(1)}
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{school.totalRatings} ratings</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {(activeTab === 'professors' && filteredProfessors.length === 0) ||
          (activeTab === 'schools' && filteredSchools.length === 0) ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No results found for "{searchQuery}"</p>
          </div>
        ) : null}
      </main>
    </div>
  );
}
