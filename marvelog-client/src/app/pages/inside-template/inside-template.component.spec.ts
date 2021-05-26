import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideTemplateComponent } from './inside-template.component';

describe('InsideTemplateComponent', () => {
  let component: InsideTemplateComponent;
  let fixture: ComponentFixture<InsideTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsideTemplateComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
