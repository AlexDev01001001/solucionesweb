import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFillComponent } from './registro-fill.component';

describe('RegistroFillComponent', () => {
  let component: RegistroFillComponent;
  let fixture: ComponentFixture<RegistroFillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroFillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
