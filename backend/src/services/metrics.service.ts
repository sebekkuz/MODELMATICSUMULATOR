// metrics.service.ts — v2 patch
// Naprawa: używa typów TFunctionRow/THousingRow/TMrpRow ze @symulator/shared
// oraz eksportuje nazwany calcMetrics (zgodny z istniejącymi importami).
import type { TFunctionRow, THousingRow, TMrpRow } from "@symulator/shared";
import { state } from "./state";

export interface MetricsSummary {
  TAKT: number;
  utilization: Record<string, number>;
  queues: Record<string, number>;
}

function buildFnToStation(functions: TFunctionRow[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const f of functions) {
    if (f.stationId) map.set(f.functionId, f.stationId);
  }
  return map;
}

export function computeMetricsSummary(functions: TFunctionRow[], housings: THousingRow[], mrp: TMrpRow[]): MetricsSummary {
  const fnToStation = buildFnToStation(functions);

  // policz wystąpienia per stacja (join przez functionId)
  const counts: Record<string, number> = {};
  for (const h of housings) {
    const stationId = fnToStation.get(h.functionId);
    if (!stationId) continue;
    counts[stationId] = (counts[stationId] ?? 0) + 1;
  }

  // normalizacja 0..100 jako placeholder "utilization"
  const max = Object.values(counts).reduce((m, v) => (v > m ? v : m), 0) || 1;
  const utilization: Record<string, number> = {};
  for (const [station, v] of Object.entries(counts)) {
    utilization[station] = Math.round((v / max) * 100);
  }
  // upewnij się, że każda stacja występuje (nawet 0)
  for (const f of functions) {
    if (!(f.stationId in utilization)) utilization[f.stationId] = 0;
  }

  // TAKT = średni serviceTime (placeholder)
  const serviceTimes = functions.map(f => Number(f.serviceTime || 0)).filter(n => !Number.isNaN(n));
  const meanService = serviceTimes.length ? serviceTimes.reduce((a,b)=>a+b,0)/serviceTimes.length : 0;
  const TAKT = Number(meanService.toFixed(2));

  // Kolejki placeholder: 0 dla wszystkich stacji
  const queues: Record<string, number> = {};
  for (const f of functions) {
    if (!(f.stationId in queues)) queues[f.stationId] = 0;
  }

  return { TAKT, utilization, queues };
}

// API kompatybilne z dotychczasowym kodem (results.routes.ts i ws/sim.gateway.ts)
export function calcMetrics(): MetricsSummary {
  return computeMetricsSummary(state.functions, state.housings, state.mrp);
}

export default { calcMetrics, computeMetricsSummary };
