import {Inspection} from "./inspection";
import {Inventory} from "./inventory";

export interface bridge {
  idBridge: number;
  name: string;
  regionalId: number;
  roadId:number;
  bridgeId: number;
  road: string;
  pr: string;
  inspections: Inspection[];
  inventory: Inventory;
  municipality: string;
}
