import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-country',
	templateUrl: './country.component.html',
	styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

	public olympic$!: Observable<Olympic[]>;
	constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }

	ngOnInit(): void {
		const olympicId = +this.route.snapshot.params['id'];
		this.olympic$ = this.olympicService.getOlympicsById(olympicId);
		console.log(this.olympic$);
	}

}
