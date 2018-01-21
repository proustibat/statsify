import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { PastePage } from '../pages/paste/paste';
import { GraphicsPage } from '../pages/graphics/graphics';

// Components
import { DataSourceComponent }      from '../components/data-source/data-source';
import { GlobalStatsComponent }     from '../components/global-stats/global-stats';
import { DisplaySettingsComponent } from '../components/display-settings/display-settings';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        PastePage,
        GraphicsPage,
        DataSourceComponent,
        GlobalStatsComponent,
        DisplaySettingsComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        PastePage,
        GraphicsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
