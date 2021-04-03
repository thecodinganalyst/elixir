import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormView} from './form-view';
import {ActivatedRoute} from '@angular/router';
import {map, pluck, shareReplay, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{

  formView: FormView;
  formGroup: FormGroup;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private fb: FormBuilder,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver
              ) {}

  onSubmit(): void {
    alert('Thanks!');
  }

  ngOnInit(): void {
    const formView$ = this.route.data.pipe(
      pluck('componentData'),
      switchMap(componentData => this.httpClient.get<FormView>(componentData))
    );
    formView$.subscribe(formView => {
      formView.data.sort((a, b) => a.order - b.order);
      this.formView = formView;

      const frmCtlList = {};
      formView.data.forEach((ctl) => {
        frmCtlList[ctl.name] = new FormControl(ctl.value, ctl.required ? Validators.required : null);
      });
      this.formGroup = this.fb.group(frmCtlList);
    });
  }

}
