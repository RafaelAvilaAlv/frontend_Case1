import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUniversidadesComponent } from './panel-universidades.component';

describe('PanelUniversidadesComponent', () => {
  let component: PanelUniversidadesComponent;
  let fixture: ComponentFixture<PanelUniversidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelUniversidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelUniversidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
