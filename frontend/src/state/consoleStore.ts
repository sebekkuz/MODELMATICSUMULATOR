import { create } from 'zustand';

export interface LogMsg { ts: number; text: string; }
interface ConsoleState {
  messages: LogMsg[];
  add: (text: string) => void;
  clear: () => void;
}

export const useConsoleStore = create<ConsoleState>((set) => ({
  messages: [],
  add: (text: string) => set((s) => ({ messages: [...s.messages.slice(-199), { ts: Date.now(), text }] })),
  clear: () => set({ messages: [] }),
}));
