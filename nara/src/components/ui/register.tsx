"use client";

import type React from "react";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  onToggle: () => void;
}

export default function RegisterForm({ onToggle }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Password tidak cocok");
    setLoading(false);
    return;
  }

  if (formData.password.length < 6) {
    setError("Password minimal 6 karakter");
    setLoading(false);
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    await updateProfile(userCredential.user, {
      displayName: formData.name,
    });

    onToggle();
    console.log("Registration successful");
  } catch (error) {
    // Type-safe error handling
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <Card className="w-full shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-6 h-6 text-amber-800" />
        </div>
        <CardTitle className="text-2xl font-bold text-amber-900">
          Daftar
        </CardTitle>
        <CardDescription className="text-amber-700">
          Buat akun baru untuk memulai
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
            <Label htmlFor="name" className="text-amber-900 font-medium">
              Nama Lengkap
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-amber-900 font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleChange}
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
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 6 karakter"
                value={formData.password}
                onChange={handleChange}
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
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-amber-900 font-medium"
            >
              Konfirmasi Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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
            {loading ? "Memproses..." : "Daftar"}
          </Button>
          <div className="text-center text-sm">
            <span className="text-amber-700">Sudah punya akun? </span>
            <Button
              type="button"
              variant="link"
              className="text-amber-800 hover:text-amber-900 font-medium p-0 h-auto"
              onClick={onToggle}
            >
              Masuk sekarang
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
