import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosList } from './libros-list';

describe('LibrosList', () => {
  let component: LibrosList;
  let fixture: ComponentFixture<LibrosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibrosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
