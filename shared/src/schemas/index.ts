import { z } from "zod";

export const FunctionRow = z.object({
  functionId: z.string().min(1),
  stationId: z.string().min(1),
  serviceTime: z.coerce.number().positive(),
});

export const HousingRow = z.object({
  housingId: z.string().min(1),
  size: z.string().min(1),
  functionId: z.string().min(1),
});

export const MrpRow = z.object({
  orderId: z.string().min(1),
  housingId: z.string().min(1),
  qty: z.coerce.number().int().positive(),
});

export type TFunctionRow = z.infer<typeof FunctionRow>;
export type THousingRow = z.infer<typeof HousingRow>;
export type TMrpRow = z.infer<typeof MrpRow>;

export interface ImportSummary {
  functions: number;
  housings: number;
  mrp: number;
  errors: { file: string; line: number; message: string }[];
}

export interface MetricsSummary {
  TAKT: number;
  utilization: Record<string, number>;
  queues: Record<string, number>;
}
