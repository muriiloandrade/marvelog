import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsFavoritesComponent } from './comics-favorites.component';

describe('ComicsFavoritesComponent', () => {
  let component: ComicsFavoritesComponent;
  let fixture: ComponentFixture<ComicsFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicsFavoritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
