import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'icon-block',
  templateUrl: './icon-block.component.html',
  styleUrls: ['./icon-block.component.scss']
})
export class IconBlockComponent implements OnInit {
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
