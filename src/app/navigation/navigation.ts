import { MenuItem } from './menuItem';

export interface Navigation {
  logo?: string;
  title: string;
  menu: MenuItem[];
  bottomMenu?: MenuItem[];
}
