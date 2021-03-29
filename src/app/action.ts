export class Action {
  name: string;
  label: string;
  method: string;
  importance: '' | 'primary' | 'accent' | 'warn' | 'disabled';
}
