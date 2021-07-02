import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAlumniComponent } from './search-alumni.component';

describe('SearchAlumniComponent', () => {
  let component: SearchAlumniComponent;
  let fixture: ComponentFixture<SearchAlumniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAlumniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAlumniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
