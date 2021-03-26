import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SandBasicsComponent } from './sand-basics.component';

describe('SandBasicsComponent', () => {
  let component: SandBasicsComponent;
  let fixture: ComponentFixture<SandBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SandBasicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SandBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
