"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, MousePointer, Shuffle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/navbar";
import { ReactNode } from "react"; 


type PracticeType = {
  id: "drawing" | "recognition" | "mixed";
  title: string;
  description: string;
  icon: ReactNode; 
};

type Aksara = {
  aksara: string;
  name: string;
  level: "Dasar" | "Menengah" | "Lanjutan"; 
};


const practiceTypes: PracticeType[] = [
  {
    id: "drawing",
    title: "Latihan Menulis",
    description: "Berlatih menulis aksara Jawa",
    icon: <Pencil className="w-8 h-8 text-orange-500" />,
  },
  {
    id: "recognition",
    title: "Pengenalan Aksara",
    description: "Latihan mengenali aksara Jawa",
    icon: <MousePointer className="w-8 h-8 text-blue-500" />,
  },
  {
    id: "mixed",
    title: "Latihan Campuran",
    description: "Kombinasi menulis dan mengenali",
    icon: <Shuffle className="w-8 h-8 text-purple-500" />,
  },
];

const aksaraList: Aksara[] = [
  { aksara: "ꦲ", name: "Ha", level: "Dasar" },
  { aksara: "ꦤ", name: "Na", level: "Dasar" },
  { aksara: "ꦕ", name: "Ca", level: "Dasar" },
  { aksara: "ꦫ", name: "Ra", level: "Dasar" },
  { aksara: "ꦏ", name: "Ka", level: "Dasar" },
  { aksara: "ꦢ", name: "Da", level: "Menengah" },
  { aksara: "ꦠ", name: "Ta", level: "Menengah" },
  { aksara: "ꦱ", name: "Sa", level: "Menengah" },
];

export default function Practice() {
  const handlePracticeClick = (typeId: PracticeType["id"]) => {
    alert(`Memulai ${practiceTypes.find((t) => t.id === typeId)?.title}...`);
  };

  const handleAksaraClick = (aksara: Aksara) => {
    alert(`Berlatih aksara ${aksara.name} (${aksara.aksara})`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">

        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Latihan</h1>
            <p className="text-muted-foreground">
              Asah kemampuan aksara Jawamu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {practiceTypes.map((type) => (
            <Card
              key={type.id} 
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              onClick={() => handlePracticeClick(type.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">{type.icon}</div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {type.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {type.description}
                </p>
                <Button className="w-full">Mulai Latihan</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              Latihan Cepat Aksara
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {aksaraList.map((item) => (
                <Card
                  key={item.name} 
                  className="cursor-pointer hover:shadow-md transition-shadow hover:scale-105"
                  onClick={() => handleAksaraClick(item)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      {item.aksara}
                    </div>
                    <h4 className="font-semibold text-foreground">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {item.level}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
