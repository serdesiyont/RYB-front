'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { schools } from '@/lib/mockData';

interface NavigationProps {
  isHomepage?: boolean;
}

export default function Navigation({ isHomepage = false }: NavigationProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`${isHomepage ? 'absolute top-0 left-0 right-0 bg-transparent' : 'bg-black'} text-white flex justify-between items-center px-12 md:px-24 py-6 z-50`}>
      <Link href="/" className="text-lg font-bold">
        Rate Your Professors
      </Link>

      {/* Navigation items - only on non-homepage */}
      {!isHomepage && (
        <div className="flex items-center gap-4 flex-1 mx-6">
          <select className="bg-black text-white border border-gray-600 rounded px-3 py-1 text-sm hover:border-gray-400">
            <option>Professors</option>
            <option>Schools</option>
          </select>
          <span className="text-sm">at</span>
          <select className="bg-black text-white border border-gray-600 rounded px-3 py-1 text-sm hover:border-gray-400">
            {schools.map(school => (
              <option key={school.id}>{school.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Right side items */}
      {isHomepage ? (
        <div className="flex items-center gap-4 ml-auto">
          <Button
            onClick={() => setIsLoggedIn(true)}
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-sm"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => setIsLoggedIn(true)}
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-sm"
          >
            Log In
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4 ml-auto">
          {!isLoggedIn ? (
            <>
              <Button
                onClick={() => setIsLoggedIn(true)}
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-gray-800 text-sm"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => setIsLoggedIn(true)}
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-gray-800 text-sm"
              >
                Log In
              </Button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-sm font-semibold hover:text-gray-300 flex items-center gap-2"
              >
                HEY, SERDESIYON
                <span className="text-xs">▼</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/account-settings"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                    onClick={() => setShowDropdown(false)}
                  >
                    Account Settings
                  </Link>
                  <Link
                    href="/my-ratings"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                    onClick={() => setShowDropdown(false)}
                  >
                    Your Ratings
                  </Link>
                  <Link
                    href="/saved-professors"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                    onClick={() => setShowDropdown(false)}
                  >
                    Saved Professors
                  </Link>
                  <div className="border-t border-gray-200 my-1" />
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
