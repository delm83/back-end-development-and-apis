import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer((req, res) => {
    fs.readFile('./public/index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

const wss = new WebSocketServer({ server });

wss.on('connection', (socket, req) => {
    const username = new URL(req.url, "http://localhost").searchParams.get("username") || "Anonymous";
    const joinMessage = JSON.stringify({
        type: "system",
        text: `${username} joined`
    });

    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(joinMessage);
        }
    });

    socket.on('message', (data) => {
        try {
            const parsedData = JSON.parse(data.toString());
            const chatMessage = JSON.stringify({
                type: 'chat',
                username: parsedData.username,
                text: parsedData.text
            });

            wss.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(chatMessage);
                }
            });
        } catch (err) {
            console.error("Error parsing message:", err);
        }
    });

    socket.on('close', () => {
        const leaveMessage = JSON.stringify({
            type: "system",
            text: `${username} left`
        });

        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(leaveMessage);
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Chat server running at http://localhost:${PORT}`);
});