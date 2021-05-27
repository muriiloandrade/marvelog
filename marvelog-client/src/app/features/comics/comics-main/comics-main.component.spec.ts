import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsMainComponent } from './comics-main.component';

describe('ComicsMainComponent', () => {
  let component: ComicsMainComponent;
  let fixture: ComponentFixture<ComicsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
