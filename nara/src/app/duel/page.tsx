"use client";

import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Loader2, Swords, Users } from "lucide-react";

type BaseQuestion = {
  question: string;
  type: "multiple-choice" | "drawing";
};

type MultipleChoiceQuestion = BaseQuestion & {
  type: "multiple-choice";
  options: string[];
  correct: string;
};

type DrawingQuestion = BaseQuestion & {
  type: "drawing";
  targetAksara: string;
};

type Question = MultipleChoiceQuestion | DrawingQuestion;


// The initial, unshuffled quiz data
const initialQuizData = {
  questions: [
    {
      type: "multiple-choice",
      question: "Select the correct script for the letter 'KA'",
      options: ["ꦏ", "ꦐ", "ꦑ", "ꦒ"],
      correct: "ꦏ",
    },
    {
      type: "drawing",
      question: "Draw the script for 'DHA' (ꦝ)",
      targetAksara: "ꦝ",
    },
    {
      type: "multiple-choice",
      question: "Which one is the script for 'GA'?",
      options: ["ꦒ", "ꦓ", "ꦔ", "ꦕ"],
      correct: "ꦒ",
    },
    {
      type: "drawing",
      question: "Draw the script for 'YA' (ꦪ)",
      targetAksara: "ꦪ",
    },
    {
      type: "multiple-choice",
      question: "Choose the appropriate script for 'SA'",
      options: ["ꦱ", "ꦲ", "꦳", "ꦴ"],
      correct: "ꦱ",
    },
    {
      type: "multiple-choice",
      question: "What is the script for the letter 'MA'?",
      options: ["ꦩ", "ꦪ", "ꦫ", "ꦬ"],
      correct: "ꦩ",
    },
  ],
};

type MemberInfo = {
  name?: string; // or whatever info you're attaching
};

type PresenceMember = {
  id: string;
  info: MemberInfo;
};

type CurrentMembers = {
  myID: string;
  members: Record<string, MemberInfo>;
};


const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function LobbyPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Connecting...");
const [members, setMembers] = useState<PresenceMember[]>([]);
const [myId, setMyId] = useState<string | null>(null);

  useEffect(() => {
    const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusherInstance.subscribe("presence-aksara-duel");

  channel.bind(
    "pusher:subscription_succeeded",
    (currentMembers: CurrentMembers) => {
      setStatus("Waiting for opponent...");
      setMyId(currentMembers.myID);
      const memberArray = Object.keys(currentMembers.members).map((id) => ({
        id: id,
        info: currentMembers.members[id],
      }));
      setMembers(memberArray);
    }
  );

  channel.bind("pusher:member_added", (member: PresenceMember) => {
    setMembers((prev) => [...prev, member]);
  });

  channel.bind("pusher:member_removed", (member: PresenceMember) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
  });


    return () => {
      pusherInstance.unsubscribe("presence-aksara-duel");
      pusherInstance.disconnect();
    };
  }, [router]);

  useEffect(() => {
    if (members.length === 2 && myId) {
      setStatus("Opponent found! Starting duel...");
      const sortedMembers = [...members].sort((a, b) =>
        a.id.localeCompare(b.id)
      );

      if (myId === sortedMembers[0].id) {
        // --- FIX: Initiator now creates and saves the shared quiz ---
        const shuffledQuestions = shuffleArray(initialQuizData.questions).map(
          (q) => {
            if (q.type === "multiple-choice") {
              return { ...q, options: shuffleArray(q.options ?? []) };
            }
            return q;
          }
        );

        const sharedQuiz = { questions: shuffledQuestions };
        sessionStorage.setItem("currentDuelQuiz", JSON.stringify(sharedQuiz));
        // ----------------------------------------------------------------

        const duelId = uuidv4();
        fetch("/api/pusher/trigger", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            channel: "presence-aksara-duel",
            event: "duel-starting",
            data: { duelId },
          }),
        });
      }
    } else if (members.length < 2) {
      setStatus("Waiting for opponent...");
    }
  }, [members, myId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 text-center p-4">
      <Swords className="w-20 h-20 text-orange-400 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Finding Opponent
      </h1>
      <div className="flex items-center text-md md:text-lg text-gray-600">
        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
        <p>{status}</p>
      </div>
      <div className="mt-4 text-gray-500 flex items-center gap-2">
        <Users className="w-5 h-5" />
        <span>{members.length} player(s) in lobby.</span>
      </div>
    </div>
  );
}
