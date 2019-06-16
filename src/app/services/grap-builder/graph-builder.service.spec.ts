import { TestBed } from '@angular/core/testing';

import { GraphBuilderService } from './graph-builder.service';

describe('GraphBuilderService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: GraphBuilderService = TestBed.get(GraphBuilderService);
		expect(service).toBeTruthy();
	});
});
