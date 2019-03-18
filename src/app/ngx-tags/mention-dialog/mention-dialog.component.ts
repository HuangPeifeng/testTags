import { Component, OnInit, Input, ViewChild, ReflectiveInjector, Output, EventEmitter, Renderer, ElementRef } from '@angular/core';
import { MentionDialogDirective } from './mention-dialog.directive';
import { NgxFactory, NgxPosition, NgxSender } from '../ngx-tags';

@Component({
  selector: 'app-mention-dialog',
  templateUrl: './mention-dialog.component.html',
  styleUrls: ['./mention-dialog.component.scss']
})
export class MentionDialogComponent implements OnInit {
  @Input() component;
  @Input() factory: NgxFactory;
  @Input() position: NgxPosition;
  @Input() data: any;

  @Output() send = new EventEmitter<any>();

  isSend = false;

  refInjector: ReflectiveInjector;

  @ViewChild(MentionDialogDirective) mentionDialog: MentionDialogDirective;

  constructor(
    private renderer: Renderer,
    private ele: ElementRef
  ) {
    this.renderer.listen(
      this.ele.nativeElement,
      'click',
      $event => {
        $event.preventDefault();
        $event.stopPropagation();
        $event.stopImmediatePropagation();
        // NgxTagsService.clickDialog.next(true);
      });
  }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.factory.resolver.resolveComponentFactory(this.component);

    const viewContainerRef = this.mentionDialog.viewContainerRef;

    viewContainerRef.clear();

    this.refInjector = ReflectiveInjector.resolveAndCreate([{ provide: this.component, useValue: this.component }], this.factory.injector);

    const componentRef = viewContainerRef.createComponent(componentFactory, 0, this.refInjector);

    (componentRef.instance as NgxSender).inputData = this.data;

    (componentRef.instance as NgxSender).sendData.subscribe(x => {
      this.send.emit(x);
    });
  }

  getPosition() {
    if (this.position) {
      return {
        left: this.position.left,
        top: this.position.top
      };
    }
  }

}
