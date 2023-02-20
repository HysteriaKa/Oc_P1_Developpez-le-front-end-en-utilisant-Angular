import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ChartComponent } from './chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PieChartModule } from '@swimlane/ngx-charts';

@NgModule({
	declarations: [AppComponent, HomeComponent, NotFoundComponent, ChartComponent],
	imports: [BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		NgxChartsModule,
		PieChartModule,
		BrowserAnimationsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
