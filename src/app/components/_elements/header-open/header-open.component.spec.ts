import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOpenComponent } from './header-open.component';

describe('HeaderOpenComponent', () => {
  let component: HeaderOpenComponent;
  let fixture: ComponentFixture<HeaderOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
