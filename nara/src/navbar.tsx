"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, User, Trophy, Flame, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useFirebaseUser from "./hooks/useFirebaseUser";

interface NavbarProps {
  user?: {
    name: string;
    level: number;
    xp: number;
    streak: number;
    notifications: number;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userFirebase = useFirebaseUser();

  const defaultUser = {
    name: userFirebase?.displayName,
    level: 3,
    xp: 450,
    streak: 7,
    notifications: 2,
  };

  const currentUser = defaultUser;

  return (
    <nav className="bg-white shadow-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl shadow-md flex items-center justify-center">
              <Image
                src="/mascot-nara.png"
                alt="NARA"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">NARA</h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Nenek Nusantara
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-orange-600 hover:bg-orange-50"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/practice">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-orange-600 hover:bg-orange-50"
                >
                  Practice
                </Button>
              </Link>
              <Link href="/matchmaking">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-orange-600 hover:bg-orange-50"
                >
                  Matchmaking
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-orange-600 hover:bg-orange-50"
                >
                  Leaderboard
                </Button>
              </Link>
              <Link href="/achievements">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-orange-600 hover:bg-orange-50"
                >
                  Achievements
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 px-4 py-2 bg-muted rounded-full">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-foreground">
                  {currentUser.streak}
                </span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-foreground">
                  {currentUser.xp}
                </span>
              </div>
              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                Level {currentUser.level}
              </Badge>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-muted"
                >
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  {currentUser.notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                      {currentUser.notifications}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b border-border">
                  <h3 className="font-semibold">Notification</h3>
                </div>
                <DropdownMenuItem className="p-3">
                  <div>
                    <p className="font-medium">
                      Congratulations! 7-Day Streak!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You have successfully studied for 7 consecutive days
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3">
                  <div>
                    <p className="font-medium">New Lesson Available</p>
                    <p className="text-sm text-muted-foreground">
                      Pa-Dha-Ja-Ya-Nya characters are now ready to learn
                    </p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-muted gap-2 px-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden lg:block font-medium text-foreground">
                    {currentUser.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer text-red-600">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-muted"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-border">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground">
                    {currentUser.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Level {currentUser.level} • {currentUser.xp} XP
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/practice">
                  <Button variant="ghost" className="w-full justify-start">
                    Practice
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button variant="ghost" className="w-full justify-start">
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/achievements">
                  <Button variant="ghost" className="w-full justify-start">
                    Achievements
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
