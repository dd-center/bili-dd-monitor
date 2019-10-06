import { TestBed } from '@angular/core/testing';
import { LivingService } from './living.service';
describe('LivingService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(LivingService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=living.service.spec.js.map