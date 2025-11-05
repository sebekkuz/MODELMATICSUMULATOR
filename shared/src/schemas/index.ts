export interface DefineSection { [kind: string]: string[]; }
export interface InputsSection { [id: string]: any; }
export interface GroupsSection { [group: string]: string[]; }

export interface ModelConfig {
  define: DefineSection;
  inputs: InputsSection;
  groups?: GroupsSection;
  include?: string[];
  routes?: any[];
  mrpOrders?: any[];
}
