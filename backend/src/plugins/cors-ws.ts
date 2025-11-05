import type { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';

export async function registerCorsAndWs(app: FastifyInstance) {
  // CORS: pozwól z frontu (ENV) lub wszystkie
  const envOrigin = process.env.CORS_ORIGIN;
  const origins = envOrigin ? envOrigin.split(',').map(s => s.trim()) : true;

  await app.register(cors, {
    origin: origins,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    // credentials: false  // nic do cookies
  });

  await app.register(websocket);

  // Prosty e2e test WS (opcjonalnie)
  app.get('/ws', { websocket: true }, (conn, req) => {
    conn.socket.send(JSON.stringify({ type:'hello', t: Date.now() }));
    conn.socket.on('message', (buf) => {
      // echo
      try { conn.socket.send(buf); } catch {}
    });
  });
}
