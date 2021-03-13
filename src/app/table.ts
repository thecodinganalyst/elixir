import { View } from './view';

export interface Table extends View {
  title: string;
  dataHeaders: string[];
  headerTypes: string[];
  data?: any[];
  functions: string[];
}
