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
import {
  Bell,
  Settings,
  User,
  Trophy,
  Flame,
  Menu,
  X,
  Home,
  Target,
  Award,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ModernNavbarProps {
  user?: {
    name: string;
    level: number;
    xp: number;
    streak: number;
    notifications: number;
  };
}

export default function ModernNavbar({ user }: ModernNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const defaultUser = {
    name: "Kamu",
    level: 3,
    xp: 450,
    streak: 7,
    notifications: 2,
  };

  const currentUser = user || defaultUser;

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/practice", label: "Latihan", icon: Target },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/achievements", label: "Pencapaian", icon: Award },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
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
              <h1 className="text-xl font-bold text-gray-800">
                Aksara Lontara
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Learning Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-gray-700">
                  {currentUser.streak}
                </span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-gray-700">
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
                  className="relative hover:bg-gray-100"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  {currentUser.notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs">
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
                <Button
                  variant="ghost"
                  className="hover:bg-gray-100 gap-2 px-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden lg:block font-medium text-gray-700">
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
                    <LogOut className="w-4 h-4 mr-2" />
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
            className="md:hidden hover:bg-gray-100"
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
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{currentUser.name}</p>
                  <p className="text-gray-500 text-sm">
                    Level {currentUser.level} • {currentUser.xp} XP
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
