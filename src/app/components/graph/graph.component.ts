import { Component, OnInit, Input } from '@angular/core';
import { GraphBuilderService } from 'src/app/services/grap-builder/graph-builder.service';
import { CurveTypes } from '../../shared/CurveTypes';

export interface ICurve {
	curveIndex: number;
	curveColor: string;
}

@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html',
	styleUrls: ['./graph.component.less']
})
export class GraphComponent implements OnInit {
	canvasHeight: number;
	@Input() data: number[][] = [];
	gap = 100;

	constructor(public graphBuilder: GraphBuilderService) {}

	async ngOnInit() {
		await this.setCanvasHeight();

		const canvas = document.getElementById('graphCanvas') as HTMLCanvasElement;
		this.graphBuilder.init(canvas, this.data);
	}

	selectCurve(name: string) {
		this.graphBuilder.changeCurve(CurveTypes[name]);
	}

	private setCanvasHeight() {
		this.canvasHeight = this.data[this.data.length - 1][0] + this.gap;
	}
}
