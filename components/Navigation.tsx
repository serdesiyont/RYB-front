"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  isHomepage?: boolean;
}

export default function Navigation({ isHomepage = false }: NavigationProps) {
  const userName = "Serdesiyon"; // placeholder user name until wired to auth
  const userInitial = userName.charAt(0).toUpperCase();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchType, setSearchType] = useState<"professors" | "schools">(
    "professors"
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setShowMobileSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`${
        isHomepage ? "absolute top-0 left-0 right-0 bg-transparent" : "bg-black"
      } text-white flex items-center justify-between px-4 lg:px-6 xl:px-12 py-3 z-50`}
    >
      {/* Mobile Layout */}
      <div className="lg:hidden flex items-center justify-between w-full">
        {/* Mobile Search Icon - only show when not on homepage */}
        {!isHomepage && (
          <div className="relative" ref={mobileSearchRef}>
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="text-xl p-2"
            >
              🔍
            </button>

            {showMobileSearch && (
              <div className="absolute left-0 top-full mt-2 bg-black border border-gray-600 rounded-lg p-4 w-screen max-w-sm shadow-lg">
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <select
                      value={searchType}
                      onChange={(e) =>
                        setSearchType(
                          e.target.value as "professors" | "schools"
                        )
                      }
                      className="w-full text-sm font-medium bg-transparent border border-gray-600 rounded px-3 py-2 cursor-pointer appearance-none pr-8"
                    >
                      <option value="professors" className="bg-black">
                        Professors
                      </option>
                      <option value="schools" className="bg-black">
                        Schools
                      </option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none">
                      ▼
                    </span>
                  </div>

                  {searchType === "professors" && (
                    <input
                      type="text"
                      placeholder="Professor name"
                      className="w-full bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-white"
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Your school"
                    className="w-full bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile Logo */}
        <Link
          href="/"
          className={`text-xl font-bold bg-white text-black px-3 py-1 rounded ${
            isHomepage ? "" : "absolute left-1/2 -translate-x-1/2"
          }`}
        >
          RYP
        </Link>

        {/* Mobile Menu Icon */}
        <div className="relative" ref={mobileMenuRef}>
          {isHomepage ? (
            /* Homepage: Show auth or account actions directly */
            <div className="flex items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white hover:text-black text-xs px-4 py-1.5"
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white hover:text-black text-xs px-4 py-1.5"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-white hover:text-black text-xs px-4 py-1.5"
                  >
                    <Link href="/rate/professor">Add a Lecturer</Link>
                  </Button>
                  <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="rounded-md border border-white bg-transparent p-2 text-white hover:bg-white hover:text-black"
                    aria-label="Account menu"
                  >
                    <User className="size-4" />
                  </button>
                  {showMobileMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-lg py-2 w-48">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/my-ratings"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        Your Ratings
                      </Link>
                      <div className="border-t border-gray-200 my-1" />
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowMobileMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            /* Non-homepage: Show menu icon with dropdown */
            <>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-2xl p-2"
              >
                ☰
              </button>

              {showMobileMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-lg py-2 w-48">
                  {!isLoggedIn ? (
                    <>
                      <Link
                        href="/login"
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        Log In
                      </Link>
                      <Link
                        href="/signup"
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        Profile
                      </Link>

                      <Link
                        href="/my-ratings"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        Your Ratings
                      </Link>

                      <div className="border-t border-gray-200 my-1" />
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowMobileMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center gap-6 w-full justify-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold bg-white text-black px-3 py-1 rounded"
        >
          RYP
        </Link>

        {/* Navigation items - only on non-homepage */}
        {!isHomepage && (
          <div className="flex items-center gap-3">
            {/* Professors/Schools dropdown */}
            <div className="relative">
              <select
                value={searchType}
                onChange={(e) =>
                  setSearchType(e.target.value as "professors" | "schools")
                }
                className="flex items-center gap-1 text-sm font-medium hover:text-gray-300 bg-transparent border-none cursor-pointer appearance-none pr-5"
              >
                <option value="professors" className="bg-black">
                  Professors
                </option>
                <option value="schools" className="bg-black">
                  Schools
                </option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs pointer-events-none">
                ▼
              </span>
            </div>

            {/* Search inputs - fixed width container */}
            <div className="flex items-center gap-3 relative w-[544px]">
              <input
                type="text"
                placeholder="Professor name"
                className={`w-64 bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-white ${
                  searchType === "schools" ? "invisible" : "visible"
                }`}
              />
              <input
                type="text"
                placeholder="Your school"
                className={`w-64 bg-transparent border border-gray-500 rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-white ${
                  searchType === "schools" ? "absolute left-0" : ""
                }`}
              />
            </div>
          </div>
        )}

        {/* Right side items */}
        {isHomepage ? (
          <div className="flex ml-180 items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent rounded-full px-8 text-white border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-sm"
                >
                  <Link href="/login">Log In</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent rounded-full px-8 text-white border-white hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 text-sm"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent rounded-full px-8 text-white border-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 text-sm"
                >
                  <Link href="/rate/professor">Add a Lecturer</Link>
                </Button>

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
                        href="/my-ratings"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        onClick={() => setShowDropdown(false)}
                      >
                        Your Ratings
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
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:text-black text-sm font-medium rounded-full px-6"
                >
                  <Link href="/login">Log In</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white text-black border-white hover:bg-black hover:text-white text-sm font-medium rounded-full px-6"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="bg-white text-black border-white hover:bg-black hover:text-white text-sm font-medium rounded-full px-6"
                >
                  <Link href="/rate/professor">Add a Lecturer</Link>
                </Button>

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
                        href="/my-ratings"
                        className="block px-4 py-2 hover:bg-gray-100 text-sm font-medium"
                        onClick={() => setShowDropdown(false)}
                      >
                        Your Ratings
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
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
