import { MenuItem } from './MenuItem';

export interface Navigation {
  logo?: string;
  menu: MenuItem[];
  bottomMenu?: MenuItem[];
}
