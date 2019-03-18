import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Input() inputData;
  @Output() sendData = new EventEmitter;

  constructor() { }

  ngOnInit() {
    // console.log(this.inputData);
  }

  output() {
    this.sendData.next('close');
  }

}
