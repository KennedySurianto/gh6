import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { channel, event, data } = await req.json();
    console.log(
      `[API-TRIGGER] Received trigger request for event: '${event}' on channel: '${channel}'`
    );

    if (!channel || !event || !data) {
      console.error(
        "[API-TRIGGER] Bad request: Missing channel, event, or data."
      );
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await pusherServer.trigger(channel, event, data);
    console.log("[API-TRIGGER] Event triggered successfully via Pusher.");

    return NextResponse.json({ message: "Event triggered successfully" });
  } catch (error) {
    console.error("[API-TRIGGER] Error triggering Pusher event:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
