import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: '[routerLink]'
})
// eslint-disable-next-line
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}
