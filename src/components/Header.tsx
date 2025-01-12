"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, Sparkles, PenSquare } from "lucide-react"; // Adding icons

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition duration-150"
            >
              <Image
                src="https://phiprotocol.xyz/_next/static/media/logo.78737c65.svg"
                alt="Phi Protocol Logo"
                width={45}
                height={32}
                className="mr-2"
                priority
              />
            </Link>
          </div>

          <nav className="flex space-x-4 sm:space-x-8">
            <Link
              href="/"
              className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
            >
              <Home className="w-4 h-4 mr-1.5" />
              <span>Home</span>
            </Link>
            <Link
              href="/generate"
              className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              <span>Generate</span>
            </Link>
            <Link
              href="/submit"
              className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
            >
              <PenSquare className="w-4 h-4 mr-1.5" />
              <span>Submit Idea</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
