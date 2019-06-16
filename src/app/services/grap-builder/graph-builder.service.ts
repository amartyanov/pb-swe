import { Injectable } from '@angular/core';

import { CurveTypes } from '../../shared/CurveTypes';
import { ICurve } from 'src/app/components/graph/graph.component';

@Injectable({
	providedIn: 'root'
})
export class GraphBuilderService {
	data: number[][];
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	canvasWidth: number;
	canvasHeight: number;
	axisGap = 100;
	cellSize = 10;
	scale = 1.2;

	constructor() { }

	init(canvas: HTMLCanvasElement, data: number[][]) {
		this.data = data;
		this.ctx = canvas.getContext('2d');
		this.ctx.scale(this.scale, 1);
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;

		this.drawGrid();
		this.drawAxis();
		this.drawCurve(CurveTypes['AC.US/F']);
	}

	drawGrid() {
		let xGrid = 10;
		let yGrid = 100;

		this.ctx.beginPath();

		// horizontal
		while (xGrid < this.canvasHeight) {
			this.ctx.moveTo(0, xGrid);
			this.ctx.lineTo(this.canvasWidth, xGrid);
			xGrid += this.cellSize;
		}

		// vertical
		while (yGrid < this.canvasWidth) {
			this.ctx.moveTo(yGrid, 0);
			this.ctx.lineTo(yGrid, this.canvasHeight);
			yGrid += this.cellSize;
		}

		this.ctx.strokeStyle = '#e0e0e0';
		this.ctx.stroke();
	}

	drawAxis() {
		// line
		this.ctx.beginPath();
		this.ctx.moveTo(this.countBlocks(10), 0);
		this.ctx.lineTo(this.countBlocks(10), this.canvasHeight);

		this.ctx.strokeStyle = '#000';
		this.ctx.stroke();

		// legend
		this.ctx.moveTo(this.countBlocks(10), 0);
		let step = 10;
		let text = 100;
		while (step <= this.canvasHeight) {
			this.ctx.strokeText(String(text), this.countBlocks(5), this.countBlocks(step));
			step += this.countBlocks(1);
			text += 100;
		}
	}

	drawCurve(curveType: ICurve) {
		const { curveIndex, curveColor } = curveType;

		this.ctx.beginPath();
		this.ctx.moveTo(this.data[0][curveIndex] + this.axisGap, this.data[0][0]);

		// prevent negative values
		let prevStepNegative = false;

		// draw
		this.data.forEach(i => {
			if (this.checkNegative(i[curveIndex])) {
				if (prevStepNegative) this.ctx.moveTo(i[curveIndex] + this.axisGap, i[0]);

				this.ctx.lineTo(i[curveIndex] + this.axisGap, i[0]);
				prevStepNegative = false;
			} else {
				this.ctx.moveTo(i[curveIndex] + this.axisGap, i[0]);
				prevStepNegative = true;
			}
		});

		this.ctx.strokeStyle = curveColor;
		this.ctx.stroke();
	}

	changeCurve(curveType: ICurve) {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.drawGrid();
		this.drawAxis();
		this.drawCurve(curveType);
	}

	private countBlocks(count: number) {
		return count * 10;
	}

	private checkNegative(num: number) {
		return num >= 0;
	}
}
