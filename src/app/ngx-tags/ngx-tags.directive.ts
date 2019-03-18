import {
  Directive,
  ElementRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Input,
  ComponentRef,
  OnInit,
  Renderer,
  Output,
  EventEmitter
} from '@angular/core';
import { MentionDialogComponent } from './mention-dialog/mention-dialog.component';
import { NgxFactory, NgxPosition } from './ngx-tags';

@Directive({
  selector: '[ngxTags]'
})
export class NgxTagsDirective implements OnInit {
  @Input() ngxTags: ComponentRef<any>;
  @Input() ngxTagsFactory: NgxFactory;
  @Input() ngxTagsOption = '@' as string;
  @Input() ngxTagsData: any;

  @Output() ngxTagsOutput = new EventEmitter;

  componentRef: ComponentRef<any>;
  isOpenDialog = false;

  private blockCursorSize: { height: number, width: number };


  constructor(
    private ele: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.renderer.listen(
      this.ele.nativeElement,
      'input',
      $event => {
        if (!this.isOpenDialog) {
          if ($event.data === this.ngxTagsOption) {
            this.loadComponent(this.ngxTags, this.ngxTagsFactory, $event);
            this.isOpenDialog = true;
          }
        } else {
          console.log($event.target.value);
        }
      });

    this.renderer.listen(
      document.body,
      'click',
      $event => {
        if (this.componentRef) {
          this.closeDialog();
        }
      });
  }

  loadComponent(component: ComponentRef<any>, factory: NgxFactory, $event) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MentionDialogComponent);

    this.viewContainerRef.clear();

    this.componentRef = this.viewContainerRef.createComponent(componentFactory);

    const position = (this.createCaretPositionEle($event)) as NgxPosition;

    this.componentRef.instance.component = component;
    this.componentRef.instance.factory = factory;
    this.componentRef.instance.position = position;
    this.componentRef.instance.data = this.ngxTagsData;

    this.componentRef.instance.send.subscribe(x => {
      this.ngxTagsOutput.next(x);
      this.closeDialog();
    });
  }

  closeDialog() {
    this.isOpenDialog = false;
    this.componentRef.destroy();
  }

  /** 建立計算目前指標位置的element */
  createCaretPositionEle($event) {

    const element = $event.target;
    const properties = [
      'direction',
      'boxSizing',
      'width',
      'height',
      'overflowX',
      'overflowY',

      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'borderStyle',

      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',

      'fontStyle',
      'fontVariant',
      'fontWeight',
      'fontStretch',
      'fontSize',
      'fontSizeAdjust',
      'lineHeight',
      'fontFamily',

      'textAlign',
      'textTransform',
      'textIndent',
      'textDecoration',  // might not make a difference, but better be safe

      'letterSpacing',
      'wordSpacing',

      'tabSize',
      'MozTabSize'
    ];

    this.blockCursorSize = this.getBlockCursorDimensions(element);
    const scrollToHeightDiff = (element.scrollHeight - element.clientHeight);
    const scrollToWidthDiff = (element.scrollWidth - element.clientWidth);
    let coords = { top: 0, left: 0 };

    const div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);

    const style = div.style;
    const computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

    style.whiteSpace = 'pre-wrap';
    if (element.nodeName !== 'INPUT') {
      style.wordWrap = 'break-word';
    }
    style.position = 'absolute';

    properties.forEach(function (prop) {
      style[prop] = computed[prop];
    });

    const isBrowser = (typeof window !== 'undefined');
    const isFirefox = (isBrowser && (<any>window).mozInnerScreenX != null);
    if (isFirefox) {
      if (element.scrollHeight > parseInt(computed.height)) {
        style.overflowY = 'scroll';
      }
    } else {
      style.overflow = 'hidden';
    }

    div.textContent = element.value.substring(0, element.selectionStart);
    if (element.nodeName === 'INPUT') {
      div.textContent = div.textContent.replace(/\s/g, '\u00a0');
    }

    const span = document.createElement('span');
    span.textContent = element.value.substring(element.selectionStart) || '.';
    div.appendChild(span);

    coords = {
      top: span.offsetTop + parseInt(computed['borderTopWidth']),
      left: span.offsetLeft + parseInt(computed['borderLeftWidth'])
    };

    coords.top = element.offsetTop - scrollToHeightDiff + coords.top + this.blockCursorSize.width;
    coords.left = element.offsetLeft - (scrollToWidthDiff ? scrollToWidthDiff + this.blockCursorSize.width : 0) + coords.left;

    document.body.removeChild(div);

    return {
      left: `${coords.left}px`,
      top: `${coords.top}px`
    };
  }

  private getBlockCursorDimensions(nativeParentElement: HTMLInputElement) {
    if (this.blockCursorSize) {
      return this.blockCursorSize;
    }
    const parentStyles = window.getComputedStyle(nativeParentElement);
    return {
      height: parseFloat(parentStyles.lineHeight) || 1,
      width: parseFloat(parentStyles.fontSize)
    };
  }

}
