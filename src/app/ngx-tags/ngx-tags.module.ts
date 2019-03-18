import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTagsDirective } from './ngx-tags.directive';
import { MentionDialogComponent } from './mention-dialog/mention-dialog.component';
import { MentionDialogDirective } from './mention-dialog/mention-dialog.directive';

@NgModule({
  declarations: [NgxTagsDirective, MentionDialogComponent, MentionDialogDirective],
  imports: [
    CommonModule
  ],
  exports: [
    NgxTagsDirective
  ],
  entryComponents: [
    MentionDialogComponent
  ]
})
export class NgxTagsModule { }
