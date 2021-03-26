import {Component, Input, OnInit, HostBinding} from '@angular/core';

@Component({
  selector: 'square-element',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @HostBinding('style.-corners-size') @Input() cornersSize: number;
  @Input() cornersPosition: string;
  @Input() borders: boolean;
  @Input() element: boolean;
  @Input() elementName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
