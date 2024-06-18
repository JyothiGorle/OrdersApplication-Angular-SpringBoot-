import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewitemsComponent } from './addnewitems.component';

describe('AddnewitemsComponent', () => {
  let component: AddnewitemsComponent;
  let fixture: ComponentFixture<AddnewitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
