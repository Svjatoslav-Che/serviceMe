import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandCoreComponent } from './sand-core.component';

describe('SandCoreComponent', () => {
  let component: SandCoreComponent;
  let fixture: ComponentFixture<SandCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
