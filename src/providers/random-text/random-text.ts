import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RandomTextProvider {

    private texts = [
        'assets/texts/1661.txt',
        'assets/texts/1661-1.txt',
        'assets/texts/1661-2.txt',
        'assets/texts/1661-3.txt',
        'assets/texts/1661-4.txt',
        'assets/texts/1661-5.txt',
        'assets/texts/1661-6.txt',
        'assets/texts/56403-0.txt',
        'assets/texts/56403-1.txt',
        'assets/texts/56403-2.txt',
        'assets/texts/56403-3.txt',
        'assets/texts/pg2500.txt',
        'assets/texts/pg2500-1.txt',
        'assets/texts/pg2500-2.txt',
        'assets/texts/pg2500-3.txt',
        'assets/texts/pg2500-4.txt',
        'assets/texts/pg2500-5.txt',
        'assets/texts/pg2500-6.txt',
        'assets/texts/pg2500-7.txt',
        'assets/texts/pg5200.txt',
        'assets/texts/pg5200-1.txt',
        'assets/texts/pg5200-2.txt'
    ];

    constructor( private http: HttpClient ) {
        console.log( 'Hello RandomTextProvider Provider' );
    }
    public getRandom() {
        return new Promise( ( resolve, reject ) => {

            const url = this.texts[ Math.floor( Math.random() * this.texts.length - 1 ) ];

            this.http.get( url, { responseType: 'text' } )
                .subscribe(
                    ( res ) => resolve( res.replace( '\n', '' ) ),
                    ( error ) => resolve( { error: `Error when loading ${url}:`, details: error } )
                );
        } );
    }
}
