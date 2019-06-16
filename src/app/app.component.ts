import { Component, OnInit } from '@angular/core';

import { theData } from '../assets/data.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
	data: number[][];

	constructor() {}

	ngOnInit() {
		this.data = theData as number[][];
	}
}
