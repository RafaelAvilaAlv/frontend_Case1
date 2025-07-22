import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCsvUniversidadesComponent } from './gestion-csv-universidades.component';

describe('GestionCsvUniversidadesComponent', () => {
  let component: GestionCsvUniversidadesComponent;
  let fixture: ComponentFixture<GestionCsvUniversidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCsvUniversidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCsvUniversidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
