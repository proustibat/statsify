import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { PastePage } from '../pages/paste/paste';

// Components
import { DataSourceComponent } from '../components/data-source/data-source';
import { GlobalStatsComponent } from '../components/global-stats/global-stats';
import { DisplaySettingsComponent } from '../components/display-settings/display-settings';

// Providers
import { CustomProviders, ExternalProviders } from '../providers';
import { HttpClientModule } from '@angular/common/http';

@NgModule( {
    bootstrap: [IonicApp],
    declarations: [
        MyApp,
        HomePage,
        PastePage,
        DataSourceComponent,
        GlobalStatsComponent,
        DisplaySettingsComponent,
    ],
    entryComponents: [
        MyApp,
        HomePage,
        PastePage,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot( MyApp )
    ],
    providers: [
        ...CustomProviders,
        ...ExternalProviders
    ]
} )
export class AppModule {}
