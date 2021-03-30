import { Injectable } from '@angular/core';
import { LocalsService } from './local-storage.service';
import { CommonService } from "./common.service";
import { GlobalsService } from "./globals.service";

@Injectable()
export class ActionService {
    constructor(
        private localsService: LocalsService,
        private _data: CommonService,
        private globalsService: GlobalsService
    ) {}

    public actionGenerator(
        subject: string,
        location: string,
        action: string,
        description: string,
        params: any ): any {
        this._data.updateMessage({
            subject: subject,
            location: location,
            action: action,
            description: description,
            params: params,
            date: Date()
            }
        )
        if (this.globalsService.userLogged && this.globalsService.achievesList) {
            this.achivesChecker(location, action, params);
        }
    }

    achivesChecker(
        location: string,
        action: string,
        params: any) {
        let i = 0;
        this.globalsService.achievesList.default.visit_page.forEach(element => {
                if (!element.solved) {
                    // console.log(element)
                    if (element.name === location && params === 'open') {
                        console.log('got match ' + location);
                        this.globalsService.achievesList.default.visit_page[i].solved = true;
                        if (!this.globalsService.newAchieve) {
                            this.globalsService.newAchieve = true;
                        }
                    }
                }
            i++;
            }
        );
    }
}
