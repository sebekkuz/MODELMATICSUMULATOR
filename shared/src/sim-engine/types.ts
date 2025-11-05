export type EventType = "ARRIVAL"|"DEPARTURE"|"MOVE"|"ASSIGN"|"RELEASE"|"TICK";

export interface Event { time: number; type: EventType; payload?: any; }

export interface Snapshot {
  time: number;
  objects: { id: string; status: "working"|"idle"|"error"; position?: [number,number]; }[];
  metrics: { TAKT?: number; utilization?: Record<string, number>; queues?: Record<string, number> };
  events?: { type: string; timestamp: number; }[];
}
