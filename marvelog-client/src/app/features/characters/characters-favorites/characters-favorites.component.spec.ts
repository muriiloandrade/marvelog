import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersFavoritesComponent } from './characters-favorites.component';

describe('CharactersFavoritesComponent', () => {
  let component: CharactersFavoritesComponent;
  let fixture: ComponentFixture<CharactersFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersFavoritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
