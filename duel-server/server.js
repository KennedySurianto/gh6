// server.js
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

const wss = new WebSocket.Server({ port: 8080 });

let waitingPlayer = null;
const gameRooms = new Map();

console.log("WebSocket server started on port 8080");

wss.on("connection", (ws) => {
  ws.id = uuidv4();
  console.log(`Client ${ws.id} connected.`);

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case "find_match":
        handleFindMatch(ws);
        break;
      case "submit_answer":
        handleSubmitAnswer(ws, data.payload);
        break;
    }
  });

  ws.on("close", () => {
    console.log(`Client ${ws.id} disconnected.`);
    // Handle player disconnection during a game (e.g., forfeit)
    if (ws.roomId && gameRooms.has(ws.roomId)) {
        const room = gameRooms.get(ws.roomId);
        const opponent = room.players.find(player => player.id !== ws.id);
        if(opponent && opponent.readyState === WebSocket.OPEN) {
            opponent.send(JSON.stringify({ type: 'opponent_disconnected' }));
        }
        gameRooms.delete(ws.roomId);
    }
  });
});

function handleFindMatch(ws) {
  if (waitingPlayer) {
    // Match found! Create a room.
    const room = createGameRoom(waitingPlayer, ws);
    gameRooms.set(room.id, room);

    // Notify both players that a match was found
    broadcastToRoom(room, {
      type: "match_found",
      payload: { roomId: room.id, players: room.players.map(p => p.id) },
    });
    console.log(`Match found! Room ${room.id} created for ${room.players.map(p=>p.id).join(' and ')}.`);
    
    waitingPlayer = null;
  } else {
    // No player waiting, this player becomes the waiting player.
    waitingPlayer = ws;
    ws.send(JSON.stringify({ type: "searching" }));
    console.log(`Player ${ws.id} is waiting for a match.`);
  }
}

function handleSubmitAnswer(ws, payload) {
    const room = gameRooms.get(ws.roomId);
    if (!room) return;

    const playerState = room.state.players[ws.id];
    playerState.progress++;
    
    // In a real app, you'd get quizData from a shared source
    const question = quizData.questions[payload.questionIndex];
    if (question.type === 'multiple-choice' && question.correct === payload.answerIndex) {
        playerState.score++;
    }

    // Check if the game is over
    const allFinished = Object.values(room.state.players).every(p => p.progress >= quizData.questions.length);
    if (allFinished) {
        room.state.status = 'finished';
        broadcastToRoom(room, { type: 'game_end', payload: room.state });
        gameRooms.delete(room.id); // Clean up the room
    } else {
        // Broadcast the updated state to both players
        broadcastToRoom(room, { type: 'game_update', payload: room.state });
    }
}

function createGameRoom(player1, player2) {
  const roomId = uuidv4();
  const room = {
    id: roomId,
    players: [player1, player2],
    state: {
      status: "playing",
      players: {
        [player1.id]: { progress: 0, score: 0 },
        [player2.id]: { progress: 0, score: 0 },
      },
    },
  };
  player1.roomId = roomId;
  player2.roomId = roomId;
  return room;
}

function broadcastToRoom(room, message) {
  room.players.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

// You would share this with the client
const quizData = { questions: [{ type: 'multiple-choice', correct: 0 }, /* ... more questions */] };
quizData.questions.length = 6; // Just for the example