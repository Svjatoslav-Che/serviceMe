import { Injectable} from '@angular/core';
import { LocalsService } from "./local-storage.service";

@Injectable()
export class GlobalsService {
    constructor(
        private localsService: LocalsService
    ) {
    }
    //LOGIN SERVICE
    userLogged: boolean = false;
    cookiesPolicy: boolean = false;

    //POPUP SERVICE
    popupService: string = '';
    currentTicket: any;
    currentTicketNum: number;

    //--RE to SESSION STORAGE OR LEAVE HERE
    deviceInfo: any;

    // LOADER AND FIRST DRAW CONDITIONS
    loads: boolean = false;
    firstDrawLoad: boolean = false;
    firstAppear: boolean = false;

    // LOGGER BEHAVIOR
    loggerData = [];

    //ACHIEVES LIST
    achievesList: any = undefined;
    newAchieve: boolean = false;
    currentAchieve: any;


    // SETTINGS VARIABLES
    colorSettings: string = this.checkColorScheme();
    backgroundSettings: string = this.checkBackground();
    soundVol: number = this.checkSoundVol();
    language: string;
    soundAmbient = this.soundVol;

    checkBackground() {
        let background = this.localsService.get('background');
        if (background) {
            return background;
        } else {
            return 'full';
        }
    }

    checkColorScheme() {
        let colorScheme = this.localsService.get('colorScheme');
        if (colorScheme) {
            return colorScheme;
        } else {
            return 'color_scheme_green';
        }
    }

    checkSoundVol() {
        let soundVol = parseInt(this.localsService.get('soundVol'));
        if (soundVol) {
            return soundVol;
        } else {
            return 30;
        }
    }
}
