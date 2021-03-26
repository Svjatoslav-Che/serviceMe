import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandStructureComponent } from './sand-structure.component';

describe('SandStructureComponent', () => {
  let component: SandStructureComponent;
  let fixture: ComponentFixture<SandStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
