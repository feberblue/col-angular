import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientwsComponent } from './clientws.component';

describe('ClientwsComponent', () => {
  let component: ClientwsComponent;
  let fixture: ComponentFixture<ClientwsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientwsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
