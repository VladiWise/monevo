export type IndexCBType = "deposit" | "credit";

export interface DB_IndexCBDeposit {
  value_91d_180d: number;
  value_181d_1y: number;
  value_1y_3y: number;
  value_over_3y: number;
  date: Date;
};

export interface DB_IndexCBDCredit {
  value_91d_180d: number;
  value_181d_1y: number;
  value_1y_3y: number;
  value_over_3y: number;
  date: Date;
};


export interface API_IndexCB {
  colId: number;
  element_id: number;
  measure_id: number;
  unit_id: number;
  obs_val: number;
  rowId: number;
  dt: string;
  periodicity: string;
  date: string;
  digits: number;
};

