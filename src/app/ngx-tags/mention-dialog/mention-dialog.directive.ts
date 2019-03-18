import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mentionDialog]'
})
export class MentionDialogDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
