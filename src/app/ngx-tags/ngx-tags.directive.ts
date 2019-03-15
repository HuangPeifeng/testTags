import {
  Directive,
  ElementRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Input,
  ComponentRef,
  OnInit,
  Renderer
} from '@angular/core';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

@Directive({
  selector: '[ngxTags]'
})
export class NgxTagsDirective implements OnInit {
  @Input() ngxTags: ComponentRef<any>;

  container: Container;
  lastRect;

  constructor(
    private ele: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.renderer.listen(this.ele.nativeElement, 'input', $event => {
      if ($event.data === '@') {
        console.log(window.getComputedStyle(this.ele.nativeElement).getPropertyValue('font-size'));
        console.log($event);

        this.loadComponent(this.ngxTags);

        this.createCaretPositionEle($event);
      }
    });
  }

  loadComponent(component) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    this.viewContainerRef.clear();

    const componentRef = this.viewContainerRef.createComponent(componentFactory) as ComponentRef<any>;

    console.log(componentRef);
  }

  /** 建立計算目前指標位置的element */
  createCaretPositionEle($event) {
    const caretEle = document.getElementsByClassName('caretDiv');
    if (caretEle.length) {
      caretEle[0].parentNode.removeChild(caretEle[0]);
    }

    const textareaMirror = this.createElement('div', document.body, 'caretDiv');
    textareaMirror.style.position = 'absolute';
    textareaMirror.style.whiteSpace = 'pre';
    textareaMirror.style.left = `${$event.target.offsetLeft}px`;
    textareaMirror.style.top = `${$event.target.offsetTop - $event.target.scrollTop}px`;

    const textareaMirrorInline = this.createElement('span', textareaMirror);
    textareaMirrorInline.style.opacity = 0;

    textareaMirrorInline.innerHTML = $event.target.value.substr(0, $event.target.selectionStart).replace(/\n/ig, '\n');

    const rects = textareaMirrorInline.getClientRects();
    this.lastRect = rects[rects.length - 1];
  }

  /** 建立element */
  createElement(type, parent, className?) {
    const el = document.createElement(type);
    parent.appendChild(el);
    if (className) {
      el.className = className;
    }
    return el;
  }

}
