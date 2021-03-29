export class View {
  layout: string;
  title?: string;
  data?: any[];
  functions: any[];

  constructor(options: {
      title?: string;
      data?: any[];
      functions?: any[];
    } = {}){
    this.title = options.title || '';
    this.data = options.data || [];
    this.functions = options.functions || [];
  }
}

export interface Function {
  name: string;
  label: string;
  method: string;
  importance: '' | 'primary' | 'accent' | 'warn' | 'disabled';
}
