import { View } from './view';

export interface TableView extends View {
  title: string;
  dataHeaders: string[];
  headerTypes: string[];
  data?: any[];
  functions: string[];
}
