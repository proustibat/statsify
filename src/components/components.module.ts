import { NgModule } from '@angular/core';
import { DataSourceComponent } from './data-source/data-source';
import { GlobalStatsComponent } from './global-stats/global-stats';
import { DisplaySettingsComponent } from './display-settings/display-settings';
@NgModule( {
    declarations: [
        DataSourceComponent,
        GlobalStatsComponent,
        DisplaySettingsComponent
    ],
    exports: [
        DataSourceComponent,
        GlobalStatsComponent,
        DisplaySettingsComponent
    ],
    imports: [],
} )
export class ComponentsModule {}
