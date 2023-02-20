import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
	private olympicUrl = './assets/mock/olympic.json';
	private participation$ = new BehaviorSubject<any>(undefined);	

	constructor(private http: HttpClient) {}
	loadInitialData() {

		return this.http.get<Olympic[]>(this.olympicUrl).pipe(
			tap((value) => this.participation$.next(value)),
			catchError((error, caught) => {
			  // TODO: improve error handling
			  console.error(error);
			  // can be useful to end loading state and let the user know something went wrong
			  this.participation$.next(null);
			  return caught;
			})
		  );
		}
	  // return un observable tableau de Olympic
		getParticipations():Observable<Olympic[]> {
		  return this.participation$.asObservable();
	}

}