import { NgModule } from '@angular/core';
import { AutosizeDirective } from './autosize/autosize';
@NgModule( {
    declarations: [AutosizeDirective],
    exports: [AutosizeDirective],
    imports: [],
} )
export class DirectivesModule {}
