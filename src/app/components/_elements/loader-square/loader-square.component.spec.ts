import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSquareComponent } from './loader-square.component';

describe('LoaderSquareComponent', () => {
  let component: LoaderSquareComponent;
  let fixture: ComponentFixture<LoaderSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
