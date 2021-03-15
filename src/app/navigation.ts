import { MenuItem } from './MenuItem';

export interface Navigation {
  logo?: string;
  title: string;
  menu: MenuItem[];
  bottomMenu?: MenuItem[];
}
