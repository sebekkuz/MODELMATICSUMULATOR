import { useEffect, useRef } from 'react';
import { wsUrl } from '../lib/api';
import { useConsoleStore } from '../state/consoleStore';

export function useWS(auto=true){
  const wsRef = useRef<WebSocket|null>(null);
  const add = useConsoleStore(s=>s.add);

  useEffect(()=>{
    if(!auto) return;
    const url = wsUrl();
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onopen = ()=> add(`[WS] connected: ${url}`);
    ws.onmessage = (ev)=> add(`[WS] msg: ${ev.data}`);
    ws.onerror = ()=> add(`[WS] error`);
    ws.onclose = ()=> add(`[WS] closed`);
    return ()=> ws.close();
  },[auto, add]);

  return wsRef;
}
