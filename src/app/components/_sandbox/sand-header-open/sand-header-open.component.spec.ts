import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandHeaderOpenComponent } from './sand-header-open.component';

describe('SandHeaderOpenComponent', () => {
  let component: SandHeaderOpenComponent;
  let fixture: ComponentFixture<SandHeaderOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandHeaderOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandHeaderOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
