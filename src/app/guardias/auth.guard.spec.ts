import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuard } from './auth.guard'; // ✅ Corrige el nombre con mayúscula

describe('AuthGuard', () => {
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: spy }
      ]
    });

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    const guard = TestBed.inject(AuthGuard);
    expect(guard).toBeTruthy();
  });

  it('should redirect to login if not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const guard = TestBed.inject(AuthGuard);
    const result = guard.canActivate();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });

  it('should allow activation if token is valid', () => {
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 3600
    };
    const token = `header.${btoa(JSON.stringify(payload))}.signature`;
    spyOn(localStorage, 'getItem').and.returnValue(token);

    const guard = TestBed.inject(AuthGuard);
    const result = guard.canActivate();

    expect(result).toBeTrue();
  });
});
