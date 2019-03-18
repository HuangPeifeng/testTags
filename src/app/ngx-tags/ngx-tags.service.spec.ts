import { TestBed } from '@angular/core/testing';

import { NgxTagsService } from './ngx-tags.service';

describe('NgxTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxTagsService = TestBed.get(NgxTagsService);
    expect(service).toBeTruthy();
  });
});
