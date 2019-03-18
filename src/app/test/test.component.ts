import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Input() inputData;
  @Input() sendInputValue = new EventEmitter;
  @Output() sendData = new EventEmitter;

  list = [
    {
      id: '1',
      name: 'Test'
    },
    {
      id: '2',
      name: 'David'
    },
    {
      id: '3',
      name: 'JC'
    },
    {
      id: '4',
      name: 'Peifeng'
    },
    {
      id: '5',
      name: 'Kevin'
    },
    {
      id: '6',
      name: 'Max'
    }
  ];
  subList;

  constructor() { }

  ngOnInit() {

    this.subList = this.list;

    // console.log(this.inputData);
    this.sendInputValue.subscribe(val => {
      this.list = this.subList.filter(x => {
        if (x.name.toLowerCase().includes(val.toLowerCase())) {
          return x;
        }
      });
    });
  }

  output(item) {
    this.sendData.next(item);
  }

}
