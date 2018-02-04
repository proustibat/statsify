import { Component, Input } from '@angular/core';

@Component( {
    selector: 'global-stats',
    templateUrl: 'global-stats.html'
} )
export class GlobalStatsComponent {
    @Input( 'meta' ) public meta;
    @Input( 'specials' ) public specials;
    public specialsKey: string[] = [];
    public refKeyName: object = {
        lessUsed: 'Less',
        longest: 'Longest',
        mostUsed: 'Most',
        smallest: 'Smallest'
    };

    public ngAfterViewInit(): void {
        console.log( this.specials );
    // setTimeout 0 prevents ExpressionChangedAfterItHasBeenCheckedError
        setTimeout( () => {
            this.specialsKey = Object.keys( this.specials ).filter( ( k ) => k !== 'lessUsed' );
        }, 0 );
    }
}
