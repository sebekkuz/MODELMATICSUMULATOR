import { parse } from "csv-parse/sync";
import { z } from "zod";
import { FunctionRow, HousingRow, MrpRow } from "@symulator/shared";
import type { ImportSummary, TFunctionRow, THousingRow, TMrpRow } from "@symulator/shared";
import { state } from "./state";

function readCsv(body: any): string {
  if (!body) return "";
  if (typeof body === "string") return body;
  if ((body as any).csv) return (body as any).csv;
  return "";
}

function parseSafe<T>(text: string, schema: z.ZodSchema<T>, file: string): { rows: T[]; errors: ImportSummary["errors"] } {
  if (!text?.trim()) return { rows: [], errors: [{ file, line: 0, message: "empty body" }] };
  const records = parse(text, { columns: true, skip_empty_lines: true, trim: true });
  const rows: T[] = [];
  const errors: ImportSummary["errors"] = [];
  for (let i = 0; i < records.length; i++) {
    const r = records[i];
    const res = schema.safeParse(r);
    if (res.success) rows.push(res.data);
    else errors.push({ file, line: i+2, message: res.error.issues.map(x => x.path.join(".")+": "+x.message).join("; ") });
  }
  return { rows, errors };
}

export function importFunctions(body: any): ImportSummary {
  const text = readCsv(body);
  const { rows, errors } = parseSafe<TFunctionRow>(text, FunctionRow, "functions.csv");
  state.functions = rows;
  state.errors.push(...errors);
  return summary();
}

export function importHousings(body: any): ImportSummary {
  const text = readCsv(body);
  const { rows, errors } = parseSafe<THousingRow>(text, HousingRow, "housings.csv");
  state.housings = rows;
  state.errors.push(...errors);
  return summary();
}

export function importMrp(body: any): ImportSummary {
  const text = readCsv(body);
  const { rows, errors } = parseSafe<TMrpRow>(text, MrpRow, "mrp.csv");
  state.mrp = rows;
  state.errors.push(...errors);
  return summary();
}

export function summary(): ImportSummary {
  // cross validation: MRP housingId must exist; Housing.functionId must exist in functions
  const errors = [...state.errors];
  const fnIds = new Set(state.functions.map(f => f.functionId));
  const housingIds = new Set(state.housings.map(h => h.housingId));
  for (const h of state.housings) {
    if (!fnIds.has(h.functionId)) {
      errors.push({ file: "housings.csv", line: 0, message: `functionId '${h.functionId}' nie istnieje w functions` });
    }
  }
  for (const m of state.mrp) {
    if (!housingIds.has(m.housingId)) {
      errors.push({ file: "mrp.csv", line: 0, message: `housingId '${m.housingId}' nie istnieje w housings` });
    }
  }
  return { functions: state.functions.length, housings: state.housings.length, mrp: state.mrp.length, errors };
}
