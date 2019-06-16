import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphComponent } from './components/graph/graph.component';
import { GraphBuilderService } from './services/grap-builder/graph-builder.service';

@NgModule({
	declarations: [
		AppComponent,
		GraphComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [GraphBuilderService],
	bootstrap: [AppComponent]
})
export class AppModule { }
