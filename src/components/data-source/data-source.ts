import { Component, EventEmitter, Output } from '@angular/core';

@Component( {
    selector: 'data-source',
    templateUrl: 'data-source.html'
} )
export class DataSourceComponent {
    public readMoreTextOpened = false;
    @Output() public onShuffle = new EventEmitter();
    @Output() public onSwap = new EventEmitter();

    public toggle( forceClose?: boolean ): void {
        this.readMoreTextOpened = forceClose ? false : !this.readMoreTextOpened;
    }

    public shuffle(): void {
        this.onShuffle.emit();
    }

    public swap(): void {
        this.onSwap.emit();
    }
}
