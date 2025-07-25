"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Bell,
  Volume2,
  Palette,
  Globe,
  Shield,
  User,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/navbar";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [volume, setVolume] = useState([75]);
  const [language, setLanguage] = useState("id");
  const [theme, setTheme] = useState("orange");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-orange-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Pengaturan</h1>
            <p className="text-gray-600">Sesuaikan pengalaman belajarmu</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-orange-500" />
                Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notifikasi Push</h3>
                  <p className="text-sm text-gray-500">
                    Terima notifikasi tentang pelajaran dan pencapaian
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Pengingat Harian</h3>
                  <p className="text-sm text-gray-500">
                    Ingatkan untuk belajar setiap hari
                  </p>
                </div>
                <Switch
                  checked={dailyReminder}
                  onCheckedChange={setDailyReminder}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Waktu Pengingat</h3>
                <Select defaultValue="19:00">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00 - Pagi</SelectItem>
                    <SelectItem value="12:00">12:00 - Siang</SelectItem>
                    <SelectItem value="19:00">19:00 - Sore</SelectItem>
                    <SelectItem value="21:00">21:00 - Malam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audio */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-orange-500" />
                Audio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Efek Suara</h3>
                  <p className="text-sm text-gray-500">
                    Suara untuk jawaban benar/salah
                  </p>
                </div>
                <Switch
                  checked={soundEffects}
                  onCheckedChange={setSoundEffects}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Volume</h3>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-gray-500">{volume[0]}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-orange-500" />
                Tampilan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Tema Warna</h3>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orange">🧡 Orange (Default)</SelectItem>
                    <SelectItem value="blue">💙 Biru</SelectItem>
                    <SelectItem value="green">💚 Hijau</SelectItem>
                    <SelectItem value="purple">💜 Ungu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Language */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-orange-500" />
                Bahasa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Bahasa Interface</h3>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">🇮🇩 Bahasa Indonesia</SelectItem>
                    <SelectItem value="jv">🏛️ Bahasa Jawa</SelectItem>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-orange-500" />
                Privasi & Keamanan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Profil Publik</h3>
                  <p className="text-sm text-gray-500">
                    Tampilkan profilmu di leaderboard
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Bagikan Progress</h3>
                  <p className="text-sm text-gray-500">
                    Izinkan teman melihat progressmu
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button
                variant="outline"
                className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                <Shield className="w-4 h-4 mr-2" />
                Ubah Password
              </Button>
            </CardContent>
          </Card>

          {/* Account */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="w-5 h-5 text-orange-500" />
                Akun
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                <User className="w-4 h-4 mr-2" />
                Edit Profil
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
              >
                Ekspor Data
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus Akun
              </Button>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="border-orange-200">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                Aksara Jawa v1.0
              </h3>
              <p className="text-gray-600 mb-4">
                Aplikasi pembelajaran aksara Jawa dengan NARA
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Kebijakan Privasi
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Syarat & Ketentuan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
