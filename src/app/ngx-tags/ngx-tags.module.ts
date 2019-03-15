import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTagsDirective } from './ngx-tags.directive';

@NgModule({
  declarations: [NgxTagsDirective],
  imports: [
    CommonModule
  ],
  exports: [
    NgxTagsDirective
  ]
})
export class NgxTagsModule { }
