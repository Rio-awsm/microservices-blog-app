"use client";
import Link from "next/link";
import { useState } from "react";

import { useAppData } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Bookmark,
  CircleUserRoundIcon,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { loading, isAuth } = useAppData();

  return (
    <nav className="bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/30 shadow-2xl p-4 z-50 relative">
      {/* Background effects - matching login page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="container mx-auto flex justify-between items-center relative z-10">
        <Link href={"/blogs"} className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-gray-700/50 group-hover:bg-gray-700/80 transition-all duration-300">
            <BookOpen className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
          </div>
          <span className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
            Fresh Reads
          </span>
        </Link>

        <div className="md:hidden">
          <Button
            variant={"ghost"}
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-gray-900/60 hover:text-blue-400 transition-all duration-300 border border-gray-800/50 backdrop-blur-xl"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        <ul className="hidden md:flex justify-center items-center space-x-6 text-gray-400">
          <li>
            <Link
              href={"/blogs"}
              className="hover:text-white transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-900/60 backdrop-blur-sm border border-transparent hover:border-gray-800/50"
            >
              Home
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link
                href={"/blog/saved"}
                className="hover:text-white transition-colors duration-300 font-medium flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-900/60 backdrop-blur-sm border border-transparent hover:border-gray-800/50"
              >
                <Bookmark className="w-4 h-4" />
                <span>Saved Blogs</span>
              </Link>
            </li>
          )}
          {loading ? (
            <li>
              <div className="w-10 h-10 rounded-2xl bg-gray-900/50 backdrop-blur-sm animate-pulse border border-gray-800/50"></div>
            </li>
          ) : (
            <li>
              {isAuth ? (
                <Link
                  href={"/profile"}
                  className="hover:text-white transition-all duration-300 p-3 rounded-lg hover:bg-gray-900/60 backdrop-blur-sm group border border-gray-800/50"
                >
                  <CircleUserRoundIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </Link>
              ) : (
                <Link
                  href={"/login"}
                  className="flex items-center space-x-2 bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-xl font-medium hover:-translate-y-0.5 shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out relative",
          isOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl">
          <ul className="flex flex-col space-y-2 p-6 text-gray-400">
            <li>
              <Link
                href={"/blogs"}
                className="hover:text-white transition-colors duration-300 font-medium flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-900/60 border border-transparent hover:border-gray-800/50"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </li>
            {isAuth && (
              <li>
                <Link
                  href={"/blog/saved"}
                  className="hover:text-white transition-colors duration-300 font-medium flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-900/60 border border-transparent hover:border-gray-800/50"
                  onClick={() => setIsOpen(false)}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Saved Blogs</span>
                </Link>
              </li>
            )}
            {loading ? (
              <li className="px-4 py-3">
                <div className="w-8 h-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm animate-pulse border border-gray-800/50"></div>
              </li>
            ) : (
              <li>
                {isAuth ? (
                  <Link
                    href={"/profile"}
                    className="hover:text-white transition-colors duration-300 font-medium flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-900/60 border border-transparent hover:border-gray-800/50"
                    onClick={() => setIsOpen(false)}
                  >
                    <CircleUserRoundIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                ) : (
                  <Link
                    href={"/login"}
                    className="flex items-center justify-center space-x-2 bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl mx-2 mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
