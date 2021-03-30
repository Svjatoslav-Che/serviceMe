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
    currentData = this.data.asObservable();

    updateMessage(item: any) {
        this.data.next(item);
         if (this.globalsService.loggerData.length < 100) {
            this.globalsService.loggerData.unshift(item);
         } else {
            this.globalsService.loggerData.pop();
            this.globalsService.loggerData.unshift(item);
         }
    }

}
