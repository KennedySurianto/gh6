"use client";

import type React from "react";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, LogIn } from "lucide-react";

interface LoginFormProps {
  onToggle: () => void;
}

export default function LoginForm({ onToggle }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or handle successful login
      console.log("Login successful");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-6 h-6 text-amber-800" />
        </div>
        <CardTitle className="text-2xl font-bold text-amber-900">
          Masuk
        </CardTitle>
        <CardDescription className="text-amber-700">
          Masukkan email dan password untuk masuk ke akun Anda
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-amber-900 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-amber-900 font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-amber-600" />
                ) : (
                  <Eye className="h-4 w-4 text-amber-600" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </Button>
          <div className="text-center text-sm">
            <span className="text-amber-700">Belum punya akun? </span>
            <Button
              type="button"
              variant="link"
              className="text-amber-800 hover:text-amber-900 font-medium p-0 h-auto"
              onClick={onToggle}
            >
              Daftar sekarang
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
