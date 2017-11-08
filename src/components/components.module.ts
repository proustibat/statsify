import { NgModule } from '@angular/core';
import { DataSourceComponent } from './data-source/data-source';
import { GlobalStatsComponent } from './global-stats/global-stats';
@NgModule({
	declarations: [DataSourceComponent,
    GlobalStatsComponent],
	imports: [],
	exports: [DataSourceComponent,
    GlobalStatsComponent]
})
export class ComponentsModule {}
