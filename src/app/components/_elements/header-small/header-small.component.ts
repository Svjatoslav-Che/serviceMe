import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header-small',
  templateUrl: './header-small.component.html',
  styleUrls: ['./header-small.component.scss']
})
export class HeaderSmallComponent implements OnInit {
  @Input() public header: string;
  @Input() public headerDescription: string;
  @Input() public description: string;
  @Input() public styles: boolean;


  constructor() { }

  ngOnInit(): void {
    if (this.styles === undefined) {
      this.styles = true;
    }

  }

}
