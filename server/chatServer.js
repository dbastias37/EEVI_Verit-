import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: '*' }));

// ruta estática para el widget compilado
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Home del foro
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'templates', 'home_enhanced.html'));
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('\ud83d\dd0c Usuario conectado', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('\u26d4 Usuario desconectado', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`\ud83d\dfE Chat server escuchando en http://localhost:${PORT}`);
});
