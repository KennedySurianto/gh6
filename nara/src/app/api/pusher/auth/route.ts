import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const data = await req.text();
    const socketId = new URLSearchParams(data).get("socket_id");
    const channelName = new URLSearchParams(data).get("channel_name");

    console.log(
      `[API-AUTH] Received auth request for socket_id: ${socketId} on channel: ${channelName}`
    );

    if (!socketId || !channelName) {
      console.error(
        "[API-AUTH] Bad request: Missing socket_id or channel_name."
      );
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const user = {
      id: uuidv4(),
      user_info: {
        name: "Player " + Math.round(Math.random() * 1000),
      },
    };

    const presenseData = { user_id: user.id, user_info: user.user_info };
    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channelName,
      presenseData
    );

    console.log(`[API-AUTH] Successfully authorized user ${user.id}.`);
    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("[API-AUTH] Internal server error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
