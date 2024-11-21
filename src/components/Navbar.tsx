'use client';

import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as UserRole;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">
            Cyber Stalking Response
          </Link>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/anonymous-report">
              <Button variant="ghost">Anonymous Report</Button>
            </Link>
            {user && (userRole === 'support_staff' || userRole === 'admin') && (
              <Link href="/support/chat">
                <Button variant="ghost">Support Chat</Button>
              </Link>
            )}
            <Link href="/report">
              <Button variant="ghost">Report Incident</Button>
            </Link>
            <Link href="/guides/evidence-collection">
              <Button variant="ghost">Evidence Guide</Button>
            </Link>
            <Link href="/support-resources">
              <Button variant="ghost">Support Resources</Button>
            </Link>
            {user && (
              <Link href="/evidence/upload">
                <Button variant="ghost">Upload Evidence</Button>
              </Link>
            )}
            {user && (userRole === 'support_staff' || userRole === 'admin') && (
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            )}
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-2">
            <Link href="/anonymous-report" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Anonymous Report
              </Button>
            </Link>
            {user && (userRole === 'support_staff' || userRole === 'admin') && (
              <Link href="/support/chat" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Support Chat
                </Button>
              </Link>
            )}
            <Link href="/report" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Report Incident
              </Button>
            </Link>
            <Link href="/guides/evidence-collection" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Evidence Guide
              </Button>
            </Link>
            <Link href="/support-resources" className="block">
              <Button variant="ghost" className="w-full justify-start">
                Support Resources
              </Button>
            </Link>
            {user && (
              <Link href="/evidence/upload" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Upload Evidence
                </Button>
              </Link>
            )}
            {user && (userRole === 'support_staff' || userRole === 'admin') && (
              <Link href="/dashboard" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Dashboard
                </Button>
              </Link>
            )}
            {user ? (
              <div className="px-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="px-4">
                <SignInButton mode="modal">
                  <Button className="w-full">Sign In</Button>
                </SignInButton>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
