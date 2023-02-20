import { Component, OnInit, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartModule } from '@swimlane/ngx-charts';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {

	public olympics$!: Observable<Olympic[]>;
	public resSafe!: any;
	public sumByCountry!: any;
	public sumMedals!: any;
  public countrys!: any;
  public datas: string[] = [];

  public view: [number, number] = [700, 400];
  public showLegend = true;
  public gradient = false;
  public explodeSlices = false;
  public doughnut = false;
  public colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072']
  };

	constructor(private olympicService: OlympicService) { }

	ngOnInit(): void {
		this.olympics$ = this.olympicService.getOlympics();

		function add(accumulator: number, a: number) {
			return accumulator + a;
		}

		this.olympics$.subscribe(res => {
			if (!res) return;
			this.resSafe = res;
      this.countrys = this.resSafe.map((pays: any) => pays.country);
			const medalsByCountry = res.map((pays: any) => pays.participations);
			const nbrMedalsByCountry = medalsByCountry.map((participation: any) => participation.map((medals: any) => medals.medalsCount));
			this.sumByCountry = nbrMedalsByCountry.map((sum) => sum.reduce(add, 0));
      
      this.countrys.map((country:any,i:number)=>{
        country = {
          name:this.countrys[i],
          value:this.sumByCountry[i],
        }
        this.datas.push(country);
      })
		})
	}

  onSelect(event:any):void {
    console.log(event);
  }
}
