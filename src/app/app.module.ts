import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxTagsModule } from './ngx-tags/ngx-tags.module';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    NgxTagsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TestComponent
  ]
})
export class AppModule { }
