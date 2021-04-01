import { Injectable} from '@angular/core';
import { LocalsService } from './local-storage.service';
import { GlobalsService } from './globals.service';
import { AudioService } from "./audio.service";

@Injectable()
export class AchievesService {
    constructor(
        public localsService: LocalsService,
        public globalsService: GlobalsService,
        public audioService: AudioService,
    ) {
    }

    achievesCheckerSolvedVisit(
        location: string,
        action: string,
        params: any) {
        let i = 0;

        this.globalsService.achievesList.default.visit_page.forEach(element => {
                if (element.state === 'none') {
                    if (element.name === location && params === 'open') {
                        this.globalsService.achievesList.default.visit_page[i].state = 'solved';
                        this.globalsService.achievesList.default.visit_page[i].date = Date.parse(Date());
                        this.localsService.updateAchievesList(this.globalsService.achievesList);
                        this.audioService.audio.msg.play();
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
