import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('textarea') textarea!: ElementRef;
  @HostListener('document:keydown.enter', ['$event'])
  onEnterKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    console.log((e.target as HTMLElement).tagName);
    console.log((e.target as HTMLElement).id);
    this.getRequest();
  }
  @HostListener('document:keydown.shift.enter', ['$event.target'])
  onShiftEnterKeyDown(target: HTMLElement) {
    console.log(target.id);
  }

  constructor() {}

  getRequest() {
    // this.http.get('http://127.0.0.1:8000/api/todo/').subscribe(console.log);
  }

  ngAfterViewCheck() {
    console.log(document.activeElement);
  }
}
