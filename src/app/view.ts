export class View {
  layout: string;
  title?: string;
  data?: any[];
  functions: string[];

  constructor(options: {
      title?: string;
      data?: any[];
      functions?: string[];
    } = {}){
    this.title = options.title || '';
    this.data = options.data || [];
    this.functions = options.functions || [];
  }
}
