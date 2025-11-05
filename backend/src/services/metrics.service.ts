import type { MetricsSummary } from "@symulator/shared";
import { state } from "./state";

// prosta metryka: TAKT ~ średni serviceTime po przypisaniu MRP (waga przez qty)
export function calcMetrics(): MetricsSummary {
  const byStation = new Map<string, {totalTime: number, ops: number}>();
  const serviceTimeByFunction = new Map(state.functions.map(f => [f.functionId, f.serviceTime]));
  for (const h of state.housings) {
    const st = serviceTimeByFunction.get(h.functionId) || 0;
    const station = h.stationId || "UNKNOWN";
    const bucket = byStation.get(station) || { totalTime: 0, ops: 0 };
    // ile zleceń MRP na ten housing
    const qty = state.mrp.filter(m => m.housingId === h.housingId).reduce((a,b)=>a+b.qty, 0);
    bucket.totalTime += st * max1(qty);
    bucket.ops += max1(qty);
    byStation.set(station, bucket);
  }
  const utilization: Record<string, number> = {};
  let takt = 0;
  for (const [station, b] of byStation) {
    const avg = b.ops ? (b.totalTime / b.ops) : 0;
    utilization[station] = Math.round((avg % 100) * 100) / 100; // placeholder: pseudo-utilization
    takt += avg;
  }
  if (byStation.size) takt = takt / byStation.size;
  const queues: Record<string, number> = {};
  for (const [station, b] of byStation) queues[station] = Math.max(0, b.ops - 1);
  return { TAKT: Math.round(takt * 100) / 100, utilization, queues };
}

function max1(v:number){ return Math.max(1, v); }
