import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MissingTranslationService } from './services/missing-translation.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularResizedEventModule } from 'angular-resize-event';
// import { NgxTypedJsModule } from 'ngx-typed-js'; // --Does not meet the requirements. Was written custom component.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideModule } from 'ng-click-outside';
import { MomentModule } from 'ngx-moment';

import { CookieService } from './services/cookie.service';
import { GlobalsService } from './services/globals.service';
import { TokenService } from './services/token.service';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';
import { AudioService } from './services/audio.service';
import { LocalsService } from './services/local-storage.service';

import { NgInit } from "./directives/ng-init";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/_mainframe/header/header.component';
import { FooterComponent } from './components/_mainframe/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { BackgroundComponent } from './components/_mainframe/background/background.component';
import { ActionsComponent } from './components/actions/actions.component';

import { SandboxComponent } from './components/_sandbox/sandbox.component';
import { SandSmartBoxComponent } from './components/_sandbox/sand-smart-box/sand-smart-box.component';
import { SandAboutComponent } from './components/_sandbox/sand-about/sand-about.component';
import { SandBasicsComponent } from './components/_sandbox/sand-basics/sand-basics.component';
import { SandSoundsComponent } from './components/_sandbox/sand-sounds/sand-sounds.component';
import { SandButtonsComponent } from './components/_sandbox/sand-buttons/sand-buttons.component';
import { SandAnimationsComponent } from './components/_sandbox/sand-animations/sand-animations.component';
import { SandSquareComponent} from './components/_sandbox/sand-square/sand-square.component';
import { SquareHeaderComponent } from './components/_elements/header-square/square-header.component';
import { SandLoaderComponent } from './components/_sandbox/sand-loader/sand-loader.component';
import { SandHeaderOpenComponent } from './components/_sandbox/sand-header-open/sand-header-open.component';
import { SandTableComponent } from './components/_sandbox/sand-table/sand-table.component';
import { SandBootstrapComponent } from './components/_sandbox/sand-bootstrap/sand-bootstrap.component';
import { SandElementsComponent } from './components/_sandbox/sand-elements/sand-elements.component';
import { SandGraphsComponent } from './components/_sandbox/sand-graphs/sand-graphs.component';
import { SandIconsComponent } from './components/_sandbox/sand-icons/sand-icons.component';
import { SandBubblesComponent } from './components/_sandbox/sand-bubbles/sand-bubbles.component';
import { SandPopupComponent } from './components/_sandbox/sand-popup/sand-popup.component';

import { LoaderComponent } from './components/_elements/loader/loader.component';
import { RectangleButtonComponent } from './components/_elements/rectangle-button/rectangle-button.component';
import { HeaderOpenComponent } from './components/_elements/header-open/header-open.component';
import { HeaderSmallComponent } from './components/_elements/header-small/header-small.component';
import { SelectLanguageComponent } from './components/_elements/select-language/select-language.component';
import { SquareButtonComponent } from './components/_elements/square-button/square-button.component';
import { SquareComponent } from './components/_elements/square/square.component';
import { BigGraphComponent } from './components/_elements/big-graph/big-graph.component';
import { ContentBoxComponent } from './components/_elements/content-box/content-box.component';
import { LoaderSquareComponent } from './components/_elements/loader-square/loader-square.component';
import { AchievementComponent } from './components/achievement/achievement.component';
import { TyperComponent } from './components/_elements/typer/typer.component';
import { DropdownComponent } from './components/_elements/dropdown/dropdown.component';
import { IconBlockComponent } from './components/_elements/icon-block/icon-block.component';
import { PopupComponent } from './components/_popup/popup.component';
import { FeedbackComponent } from './components/_popup/feedback/feedback.component';
import { CookiesPolicyComponent } from './components/_popup/cookies-policy/cookies-policy.component';
import { TicketComponent } from './components/_popup/ticket/ticket.component';
import { DeleteComponent } from './components/_popup/delete/delete.component';

import { SandAchivesComponent } from './components/_sandbox/sand-achives/sand-achives.component';
import { SandPushComponent } from './components/_sandbox/sand-push/sand-push.component';
import { SandCoreComponent } from './components/_sandbox/sand-core/sand-core.component';
import { SandAssistComponent } from './components/_sandbox/sand-assist/sand-assist.component';
import { SandStructureComponent } from './components/_sandbox/sand-structure/sand-structure.component';


export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

const sandboxRoutes: Routes = [
  { path: '', component: SandAboutComponent },
  { path: 'basics', component: SandBasicsComponent },
  { path: 'table', component: SandTableComponent },
  { path: 'bootstrap', component: SandBootstrapComponent },
  { path: 'elements', component: SandElementsComponent },
  { path: 'bubbles', component: SandBubblesComponent },

  { path: 'square', component: SandSquareComponent },
  { path: 'smartbox', component: SandSmartBoxComponent },
  { path: 'buttons', component: SandButtonsComponent },
  { path: 'headers', component: SandHeaderOpenComponent },
  { path: 'graph', component: SandGraphsComponent },
  { path: 'icons', component: SandIconsComponent },
  { path: 'animations', component: SandAnimationsComponent },
  { path: 'loader', component: SandLoaderComponent },
  { path: 'sounds', component: SandSoundsComponent },

  { path: 'popup', component: SandPopupComponent },
  { path: 'achives', component: SandAchivesComponent },
  { path: 'pushup', component: SandPushComponent },
  { path: 'core', component: SandCoreComponent },
  { path: 'assistant', component: SandAssistComponent },
  { path: 'structure', component: SandStructureComponent },

  { path: '**', component: NotFoundComponent }
];

const appRoutes: Routes =[
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'sandbox', component: SandboxComponent, children: sandboxRoutes },
  { path: 'actions', component: ActionsComponent },
  { path: 'achievement', component: AchievementComponent },
  { path: '**', component: NotFoundComponent }
  // { path: 'contentbox', component: ContentBoxComponent },
  // { path: 'item/:id', component: ItemComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    BackgroundComponent,
    SandboxComponent,
    SandBasicsComponent,
    SandSoundsComponent,
    SandSmartBoxComponent,
    SandAboutComponent,
    SandButtonsComponent,
    SandAnimationsComponent,
    SquareComponent,
    SandSquareComponent,
    SquareHeaderComponent,
    SquareButtonComponent,
    SquareButtonComponent,
    SandLoaderComponent,
    LoaderComponent,
    RectangleButtonComponent,
    HeaderOpenComponent,
    SandHeaderOpenComponent,
    HeaderSmallComponent,
    SelectLanguageComponent,
    BigGraphComponent,
    ContentBoxComponent,
    LoaderSquareComponent,
    ActionsComponent,
    AchievementComponent,
    TyperComponent,
    DropdownComponent,
    SandTableComponent,
    SandBootstrapComponent,
    SandElementsComponent,
    SandGraphsComponent,
    SandIconsComponent,
    IconBlockComponent,
    SandBubblesComponent,
    PopupComponent,
    FeedbackComponent,
    CookiesPolicyComponent,
    // Directives
    NgInit,
    SandPopupComponent,
    TicketComponent,
    DeleteComponent,
    SandAchivesComponent,
    SandPushComponent,
    SandCoreComponent,
    SandAssistComponent,
    SandStructureComponent,
  ],
    imports: [
      RouterModule.forRoot(appRoutes),
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
        useDefaultLang: false,
      }),
      AngularResizedEventModule,
      // NgxTypedJsModule,
      ClickOutsideModule,
      ReactiveFormsModule,
      MomentModule,
    ],
  providers: [
    CookieService,
    GlobalsService,
    TokenService,
    ApiService,
    AudioService,
    CommonService,
    BigGraphComponent,
    LocalsService,
    // DeleteComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
