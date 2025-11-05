import type { TFunctionRow, THousingRow, TMrpRow, ImportSummary } from "@symulator/shared";
export const state = {
  functions: [] as TFunctionRow[],
  housings: [] as THousingRow[],
  mrp: [] as TMrpRow[],
  errors: [] as ImportSummary["errors"],
};
