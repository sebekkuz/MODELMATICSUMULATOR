// frontend/src/lib/ws.ts
import { wsUrl } from './net';

export function initWS(): void {
  try {
    const url = wsUrl('/ws');
    const ws = new WebSocket(url);

    ws.addEventListener('open', () => console.log('[WS] open', url));
    ws.addEventListener('message', ev => {
      try {
        const data = typeof ev.data === 'string' ? ev.data : '[binary]';
        console.log('[WS] message', data);
      } catch (e) {
        console.error('[WS] message parse error', e);
      }
    });
    ws.addEventListener('close', () => console.warn('[WS] closed'));
    ws.addEventListener('error', (e) => console.error('[WS] error', e));
  } catch (e) {
    console.error('[WS] ctor error', e);
  }
}
