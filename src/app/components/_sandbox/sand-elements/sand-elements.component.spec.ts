import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandElementsComponent } from './sand-elements.component';

describe('SandElementsComponent', () => {
  let component: SandElementsComponent;
  let fixture: ComponentFixture<SandElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
