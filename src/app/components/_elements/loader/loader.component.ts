import {Component, OnInit, Input, ElementRef} from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() size: number;
  public loading: boolean = false;
  public conditionDone: number = 0;
  public changer: boolean = false;
  public val1: string = 'in progress...';
  public val2: string = 'in progress...';
  public val3: string = 'in progress...';
  public val4: string = 'in progress...';
  public val5: string = 'in progress...';
  public val6: string = 'in progress...';

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> this.loading = true, 300);

    setTimeout(()=> {
      this.val1 = 'success';
      this.demountChecker();}, 300
    );
    setTimeout(()=> {
      this.val2 = 'success';
      this.demountChecker();}, 3300
    );
    setTimeout(()=> {
      this.val3 = 'success';
      this.demountChecker();}, 1300
    );
    setTimeout(()=> {
      this.val4 = 'error';
      this.demountChecker();}, 4000
    );
    setTimeout(()=> {
      this.val5 = 'success';
      this.demountChecker();}, 2500
    );
    setTimeout(()=> {
      this.val6 = 'success';
      this.demountChecker();}, 5000
    );
  }

  demountChecker() {
    this.conditionDone++;
    if (this.conditionDone === 6) {
        setTimeout(()=> {
          this.changer = true;
        }, 1000);
    }
  }

}
