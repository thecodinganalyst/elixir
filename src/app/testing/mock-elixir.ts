import {FormView} from '../form/form-view';
import {Navigation} from '../navigation/navigation';
import {TableView} from '../table/table-view';

export class SAMPLE {

  static MOCK_CONFIG = [
    {path: 'sample_table', component: 'table', data: 'assets/sample_table.json'},
    {path: 'sample_form', component: 'form', data: 'assets/sample_form.json'},
    {path: '', redirectTo: '/', pathMatch: 'full'}];

  static MOCK_NAVIGATION: Navigation = {
    logo: 'assets/elixir-logo-inverted.svg',
    title: 'elixir test',
    menu: [
      {icon: 'table_view', name: 'sample table', path: 'sample_table', component: 'table', data: 'assets/sample_table.json'},
      {icon: 'dynamic_form', name: 'sample form', path: 'sample_form', component: 'form', data: 'assets/sample_form.json'}
    ],
    bottomMenu: []
  };
  static MOCK_NAVIGATION_URL = 'assets/navigation.json';

  static MOCK_TABLE: TableView = {
    layout: 'table',
    title: 'Sample Table',
    dataHeaders: ['a', 'b'],
    headerTypes: ['number', 'number'],
    data: [{a: 4, b: 2}, {a: 2, b: 4}, {a: 6, b: 6}, {a: 1, b: 1}, {a: 3, b: 5}, {a: 5, b: 3}],
    actions: [{name: 'Add', label: 'Add', method: '', importance: 'primary'}]
  };
  static MOCK_TABLE_URL = 'assets/sample_table.json';

  static MOCK_FORM: FormView = {
    layout: 'form',
    title: 'Sample Form',
    data: [
      {name: 'Name', value: '', label: 'Name', required: true, order: 2, control: 'textbox', type: 'text', size: 12},
      {name: 'Type', value: '', label: 'Type', required: true, order: 1, control: 'textbox', type: 'text', size: 12},
      {name: 'Select', value: '', label: 'Select1', required: true, order: 3, control: 'dropdown', size: 6, options:
          [{display: 'one', value: 1}, {display: 'two', value: 2}]},
      {name: 'Select', value: '', label: 'Select2', required: false, order: 4, control: 'dropdown', size: 6},
      {name: 'Comment', value: '', label: 'Comment', required: true, order: 5, control: 'textarea', type: 'text', size: 12},
    ],
    actions: [
      {name: 'Save', label: 'Save', method: '', importance: 'primary'},
      {name: 'Cancel', label: 'Cancel', method: '', importance: ''}
    ]
  };
  static MOCK_FORM_URL = 'assets/sample_form.json';
}
