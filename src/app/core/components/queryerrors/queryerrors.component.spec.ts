import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryerrorsComponent } from './queryerrors.component';

describe('QueryerrorsComponent', () => {
  let component: QueryerrorsComponent;
  let fixture: ComponentFixture<QueryerrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryerrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryerrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
