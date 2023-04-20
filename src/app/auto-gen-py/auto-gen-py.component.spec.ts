import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenPyComponent } from './auto-gen-py.component';

describe('AutoGenPyComponent', () => {
  let component: AutoGenPyComponent;
  let fixture: ComponentFixture<AutoGenPyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoGenPyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoGenPyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
