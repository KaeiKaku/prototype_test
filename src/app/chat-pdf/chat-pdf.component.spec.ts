import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPDFComponent } from './chat-pdf.component';

describe('ChatPDFComponent', () => {
  let component: ChatPDFComponent;
  let fixture: ComponentFixture<ChatPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
