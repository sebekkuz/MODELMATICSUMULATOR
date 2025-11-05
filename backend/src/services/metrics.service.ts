// metrics.service.ts — patched to map stationId via functions (functionId -> stationId)
// Safe for SYMULATORPRODUKCJI.3
import type { FunctionRow, HousingRow, MrpRow } from "@symulator/shared";

export interface MetricsSummary {
  takt: number;
  utilizationPerStation: Record<string, number>;
  avgQueueLengthPerStation: Record<string, number>;
  timestamp: number;
}

type Imports = {
  functions: FunctionRow[];
  housings: HousingRow[];
  mrp: MrpRow[];
};

/** Build a map functionId -> stationId from functions CSV */
function buildFnToStation(functions: FunctionRow[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const f of functions) {
    // @ts-ignore - tolerate extra fields; we rely on runtime CSV
    const stationId: string | undefined = (f as any).stationId;
    if (typeof stationId === "string" && stationId.length > 0) {
      map.set(f.functionId, stationId);
    }
  }
  return map;
}

/** Compute simple placeholder utilization based on counts per station (joined via functionId). */
function computeUtilizationPerStation(housings: HousingRow[], functions: FunctionRow[]): Record<string, number> {
  const fnToStation = buildFnToStation(functions);
  const counts: Record<string, number> = {};

  for (const h of housings) {
    const stationId = fnToStation.get(h.functionId);
    if (!stationId) continue; // unknown function -> skip
    counts[stationId] = (counts[stationId] ?? 0) + 1;
  }

  // normalize counts to 0..100 (placeholder % utilization)
  const max = Object.values(counts).reduce((m, v) => (v > m ? v : m), 0) || 1;
  const utilization: Record<string, number> = {};
  for (const [station, v] of Object.entries(counts)) {
    utilization[station] = Math.round((v / max) * 100);
  }

  // ensure all stations present (even if 0)
  const allStations = new Set<string>(functions.map(f => (f as any).stationId).filter(Boolean));
  for (const s of allStations) {
    if (!(s in utilization)) utilization[s] = 0;
  }

  return utilization;
}

/** Compute a very simple TAKT placeholder based on average serviceTime from functions and total planned qty. */
function computeTakt(functions: FunctionRow[], mrp: MrpRow[]): number {
  const serviceTimes: number[] = [];
  for (const f of functions) {
    const st: any = (f as any).serviceTime;
    if (typeof st === "number") serviceTimes.push(st);
    else if (typeof st === "string" && !isNaN(Number(st))) serviceTimes.push(Number(st));
  }
  const meanService = serviceTimes.length
    ? serviceTimes.reduce((a, b) => a + b, 0) / serviceTimes.length
    : 1;

  const totalQty = mrp.reduce((sum, o) => {
    const q = Number((o as any).qty);
    return sum + (isNaN(q) ? 0 : q);
  }, 0);

  // placeholder: takt = mean service time per unit (if qty>0), else meanService
  return Number((totalQty > 0 ? meanService : meanService).toFixed(2));
}

/** Compute simple zero queues placeholder per station. */
function computeAvgQueues(functions: FunctionRow[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const f of functions) {
    const s = (f as any).stationId;
    if (typeof s === "string") out[s] = 0;
  }
  return out;
}

export function computeMetricsSummary(data: Imports): MetricsSummary {
  const { housings, functions, mrp } = data;
  const utilizationPerStation = computeUtilizationPerStation(housings, functions);
  const avgQueueLengthPerStation = computeAvgQueues(functions);
  const takt = computeTakt(functions, mrp);

  return {
    takt,
    utilizationPerStation,
    avgQueueLengthPerStation,
    timestamp: Date.now(),
  };
}

// default wrapper for compatibility
export default {
  compute: computeMetricsSummary,
};
