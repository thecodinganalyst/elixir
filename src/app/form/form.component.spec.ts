import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { FormComponent } from './form.component';
import {ActivatedRoute, Data} from '@angular/router';
import {of} from 'rxjs';
import {DataService} from '../data.service';
import {FormView} from './form-view';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  const mockActivatedRoute = {data: of({componentData: 'assets/sample_form.json'})};
  const mockForm: FormView = {
    layout: 'form',
    title: 'Sample Form',
    data: [
      {name: 'Name', value: '', label: 'Name', required: true, order: 1, control: 'textbox', type: 'text', size: 12},
      {name: 'Type', value: '', label: 'Type', required: true, order: 2, control: 'textbox', type: 'text', size: 12}],
    functions: ['save']
  };
  const dataServiceSpy = jasmine.createSpyObj('DataService', ['getForm']);
  dataServiceSpy.getForm.and.returnValue(of(mockForm));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: DataService, useValue: dataServiceSpy}
        ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
