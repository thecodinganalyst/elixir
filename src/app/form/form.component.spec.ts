import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { FormComponent } from './form.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {Control} from './control';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatSelectHarness} from '@angular/material/select/testing';
import {SAMPLE} from '../testing/mock-elixir';
import {HttpClient} from '@angular/common/http';
import {MatButtonHarness} from '@angular/material/button/testing';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  const mockActivatedRoute = {data: of({componentData: 'assets/sample_form.json'})};

  const httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
  httpClientSpy.get.withArgs(SAMPLE.MOCK_FORM_URL).and.returnValue(of(SAMPLE.MOCK_FORM));

  let formEl: HTMLElement;
  let matCardEl: HTMLElement;
  let mdcGridCells: Element[];

  let loader: HarnessLoader;
  let matCardActionLoader: HarnessLoader;
  let matFormFieldHarnesses: MatFormFieldHarness[];

  const mockFormSortedData: Control[] = SAMPLE.MOCK_FORM.data.sort((a, b) => a.order - b.order);

  const CtrlComponentHarnessMap = {textbox: MatInputHarness, textArea: MatInputHarness, dropdown: MatSelectHarness};

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
        {provide: HttpClient, useValue: httpClientSpy}
        ]
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.isHandset$ = of(false);
    fixture.detectChanges();

    const nativeEl = fixture.nativeElement;
    formEl = nativeEl.querySelector('form');
    matCardEl = formEl.querySelector('.mat-card');
    const mdcGridInnerEl = matCardEl.querySelector('.mdc-layout-grid__inner');
    mdcGridCells = Array.from(mdcGridInnerEl.children);

    loader = TestbedHarnessEnvironment.loader(fixture);
    matFormFieldHarnesses = await loader.getAllHarnesses(MatFormFieldHarness);
    matCardActionLoader = await loader.getChildLoader('.mat-card-actions');
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should have title as described in mockForm', () => {
    expect(component.formView.title).toBe(SAMPLE.MOCK_FORM.title);
    const matCardTitle = matCardEl.querySelector('.mat-card-title');
    expect(matCardTitle.textContent).toEqual(SAMPLE.MOCK_FORM.title);
  });

  it('should have same number of fields as described in mockForm', () => {
    expect(matFormFieldHarnesses.length).toEqual(SAMPLE.MOCK_FORM.data.length);
  });

  it('should display the labels in the order specified in mockForm', async () => {
    // tslint:disable-next-line:forin
    for (const i in mockFormSortedData) {
      const ctl = await matFormFieldHarnesses[i].getControl();
      const actualLabel = await matFormFieldHarnesses[i].getLabel();
      const expectedLabel = mockFormSortedData[i].label;
      const required = mockFormSortedData[i].required;
      if (ctl instanceof MatInputHarness){
        expect(actualLabel).toEqual(required ? expectedLabel.concat(' *') : expectedLabel);
      }else {
        expect(actualLabel).toEqual(expectedLabel);
      }
    }
  });

  it('should display the controls in the order specified in mockForm',  (done) => {
    const promises = [];
    mockFormSortedData.forEach((ctl, i) => {
      const promise = matFormFieldHarnesses[i].getControl().then(
        harnessCtrl => expect(harnessCtrl).toBeInstanceOf(CtrlComponentHarnessMap[ctl.control])
      );
      promises.push(promise);
    });
    Promise.all(promises).then(() => done());
  });

  it('should display the size correctly as specified in mockForm', async () => {
    for (let i = 0; i < mdcGridCells.length; i++){
      expect(await mdcGridCells[i].classList.contains('mdc-layout-grid__cell--span-' + mockFormSortedData[i].size)).toBeTrue();
    }
  });

  it('should display the correct type for textbox', async () => {
    for (let i = 0; i < mockFormSortedData.length; i++){
      if (mockFormSortedData[i].control === 'textbox'){
        const input = await matFormFieldHarnesses[i].getControl();
        expect(await (input as MatInputHarness).getType()).toEqual(mockFormSortedData[i].type);
      }
    }
  });

  it('should display the number of options correctly for the dropdowns', async () => {
    for (let i = 0; i < mockFormSortedData.length; i++){
      if (mockFormSortedData[i].control === 'dropdown'){
        const selectHa = (await matFormFieldHarnesses[i].getControl()) as MatSelectHarness;
        await selectHa.open();
        const optionsHa = await selectHa.getOptions();
        expect(mockFormSortedData[i].options?.length ?? 0).toEqual(optionsHa.length ?? 0);
      }
    }
  });

  it('should display the options correctly for the dropdowns', async () => {
    for (let i = 0; i < mockFormSortedData.length; i++){
      if (mockFormSortedData[i].control === 'dropdown'){
        const selectHa = (await matFormFieldHarnesses[i].getControl()) as MatSelectHarness;
        await selectHa.open();
        const optionsHa = await selectHa.getOptions();
        const select = mockFormSortedData[i];
        for (let j = 0; j < select.options?.length ?? 0; j++){
          const option = select.options[j];
          expect(option.display).toEqual(await optionsHa[j].getText());
        }
      }
    }
  });

  it('should display the buttons in the mat-card-actions', async () => {
    const matCardActionEl = matCardEl.querySelector('.mat-card-actions');
    const mockFnCount = SAMPLE.MOCK_FORM.actions.length;
    const buttons = matCardActionEl.querySelectorAll('button');
    expect(buttons?.length ?? 0).toEqual(mockFnCount);
    const matButtons = await matCardActionLoader.getAllHarnesses(MatButtonHarness);
    for (let i = 0; i < SAMPLE.MOCK_FORM.actions.length; i++){
      expect(await matButtons[i].getText()).toEqual(SAMPLE.MOCK_FORM.actions[i].label);
    }
  });

});
