import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header-open',
  templateUrl: './header-open.component.html',
  styleUrls: ['./header-open.component.scss']
})
export class HeaderOpenComponent implements OnInit {
  @Input() public header: string;
  @Input() public headerText: string;
  @Input() public description: string;
  @Input() public styles: boolean;

  constructor() { }

  ngOnInit(): void {
    if (this.styles === undefined) {
      this.styles = true;
    }
  }

}
