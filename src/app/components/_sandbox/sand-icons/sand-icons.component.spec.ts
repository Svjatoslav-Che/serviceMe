import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandIconsComponent } from './sand-icons.component';

describe('SandIconsComponent', () => {
  let component: SandIconsComponent;
  let fixture: ComponentFixture<SandIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
