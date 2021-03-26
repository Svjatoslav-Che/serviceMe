import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandAboutComponent } from './sand-about.component';

describe('SandAboutComponent', () => {
  let component: SandAboutComponent;
  let fixture: ComponentFixture<SandAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
