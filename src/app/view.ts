import {Action} from './action';

export class View {
  layout: string;
  title?: string;
  data?: any[];
  actions: Action[];

  constructor(options: {
      title?: string;
      data?: any[];
      actions?: Action[];
    } = {}){
    this.title = options.title || '';
    this.data = options.data || [];
    this.actions = options.actions || [];
  }
}
