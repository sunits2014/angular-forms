import { TestBed, inject } from '@angular/core/testing';

import { ModalTextService } from './modal-text.service';

describe('ModalTextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalTextService]
    });
  });

  it('should be created', inject([ModalTextService], (service: ModalTextService) => {
    expect(service).toBeTruthy();
  }));
});
