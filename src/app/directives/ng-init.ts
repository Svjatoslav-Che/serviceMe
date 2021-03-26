import {Directive, Input, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: '[ngInit]',
    exportAs: '[ngInit]'
})
export class NgInit {
    @Input() values: any = {};

    @Input() ngInit;
    ngOnInit() {
        if(this.ngInit) { this.ngInit(); }
    }
}
