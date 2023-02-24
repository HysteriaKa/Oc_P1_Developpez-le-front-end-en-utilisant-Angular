import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { map,find } from 'rxjs'
import { Participation } from '../models/Participation';

@Injectable({
	providedIn: 'root',
})
export class OlympicService {
	private olympicUrl = './assets/mock/olympic.json';
	private olympics$ = new BehaviorSubject<any>(undefined);

	constructor(private http: HttpClient) { }

	loadInitialData() {

		return this.http.get<Olympic[]>(this.olympicUrl).pipe(
			tap((value) => this.olympics$.next(value)),
			catchError((error, caught) => {
				// TODO: improve error handling
				console.error(error);
				// can be useful to end loading state and let the user know something went wrong
				this.olympics$.next(null);
				return caught;
			})
		);
	}
	// return un observable tableau de Olympic
	getOlympics(): Observable<Olympic[]> {
		return this.olympics$.asObservable();
	}
	
	getOlympicsById(olympicId: number):Observable<Olympic[]>  {
		const olympic$ = this.olympics$.pipe(find(olympic$ => olympic$.Id === olympicId));
		if (!olympic$) {
			throw new Error('Olympic not found!');
		} else {
			return olympic$;
		}
	}
}
