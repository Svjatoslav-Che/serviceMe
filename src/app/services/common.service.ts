import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalsService } from "./globals.service";


@Injectable()
export class CommonService {

    constructor(
        public globalsService: GlobalsService
    ) {
    }

    private data = new BehaviorSubject('');
    currentData = this.data.asObservable()

    updateMessage(item: any) {
        this.data.next(item);
        this.globalsService.loggerData.unshift(item);
    }

}
