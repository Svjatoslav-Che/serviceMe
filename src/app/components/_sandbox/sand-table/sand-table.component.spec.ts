import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandTableComponent } from './sand-table.component';

describe('SandTableComponent', () => {
  let component: SandTableComponent;
  let fixture: ComponentFixture<SandTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
