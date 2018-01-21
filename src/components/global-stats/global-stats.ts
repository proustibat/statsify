import {Component, Input} from '@angular/core';

@Component({
  selector: 'global-stats',
  templateUrl: 'global-stats.html'
})
export class GlobalStatsComponent {
  @Input('meta') meta;
  @Input('specials') specials;
  specialsKey: string[] = [];
  refKeyName: object = {
    lessUsed: 'Less',
    mostUsed: 'Most',
    longest: 'Longest',
    smallest: 'Smallest'
  };

  ngAfterViewInit(): void {
    // setTimeout 0 prevents ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => this.specialsKey = Object.keys(this.specials), 0);
  }
}
