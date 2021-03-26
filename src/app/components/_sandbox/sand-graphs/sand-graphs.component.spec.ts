import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandGraphsComponent } from './sand-graphs.component';

describe('SandGraphsComponent', () => {
  let component: SandGraphsComponent;
  let fixture: ComponentFixture<SandGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
