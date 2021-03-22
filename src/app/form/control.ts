export class Control {
  name: string;
  value?: any;
  label: string;
  required: boolean;
  order?: number;
  control: 'textbox' | 'textarea' | 'dropdown';
  type?: 'color' | 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
  options?: ControlOption[];
  size?: number;
}

export class ControlOption {
  display: string;
  value: string | number | boolean;
}
