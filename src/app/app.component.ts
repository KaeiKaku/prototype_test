import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DialogData } from './share/share.interface';
import { ChatGptService } from './service/chat-gpt.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageSequenceService } from './service/message-sequence.service';

const DEFAULT_TEXTAREA_HEIGHT = 24;
const ID_CHAT_INPUT_TEXTAREA = 'chat_input_textarea';

interface Content {
  value: string;
  isSelf: boolean;
  isAi: boolean;
  isCode: boolean;
  isError: boolean;
  referenceLink?: DialogData[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('textarea') _textarea!: ElementRef;
  @ViewChild('container') _container!: ElementRef;
  @HostListener('document:keydown.enter', ['$event'])
  onEnterKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    if (
      (e.target as HTMLElement).tagName == 'TEXTAREA' &&
      (e.target as HTMLElement).id == ID_CHAT_INPUT_TEXTAREA &&
      this._sendReady &&
      !this._isLoading
    ) {
      this.submitRequest();
    }
  }
  @HostListener('document:keydown.arrowup', ['$event'])
  handleArrowUp(e: KeyboardEvent) {
    e.preventDefault();
    if (
      (e.target as HTMLElement).tagName == 'TEXTAREA' &&
      (e.target as HTMLElement).id == ID_CHAT_INPUT_TEXTAREA
    ) {
      const preValue = this.messageSequenceService.pre();
      if (preValue) {
        this._textarea.nativeElement.value = preValue;
      }
      this.onTextareaInput();
    }
  }
  @HostListener('document:keydown.arrowdown', ['$event'])
  handleArrowDown(e: KeyboardEvent) {
    e.preventDefault();
    if (
      (e.target as HTMLElement).tagName == 'TEXTAREA' &&
      (e.target as HTMLElement).id == ID_CHAT_INPUT_TEXTAREA
    ) {
      const nextValue = this.messageSequenceService.next();
      if (nextValue) {
        this._textarea.nativeElement.value = nextValue;
      }
      this.onTextareaInput();
    }
  }

  _ID_CHAT_INPUT_TEXTAREA = ID_CHAT_INPUT_TEXTAREA;
  _sendReady: boolean = false;
  _isLoading: boolean = false;
  _contents: Content[] = [];

  constructor(
    private chatGptService: ChatGptService,
    private dialog: MatDialog,
    private messageSequenceService: MessageSequenceService
  ) {}

  ngOnInit(): void {
    this._contents.push({
      value: 'Test ChatGPT-3.5',
      isSelf: false,
      isAi: true,
      isCode: false,
      isError: false,
    });
  }

  ngAfterViewChecked(): void {
    this._container.nativeElement.scrollTop =
      this._container.nativeElement.scrollHeight -
      this._container.nativeElement.clientHeight;
  }

  onTextareaInput(): void {
    this._sendReady =
      this._textarea.nativeElement.value.trim() != '' ? true : false;
    this._textarea.nativeElement.style.height = 'auto';
    this._textarea.nativeElement.style.height =
      this._textarea.nativeElement.scrollHeight + 'px';
  }

  resetTexarea(): void {
    this._textarea.nativeElement.style.height = DEFAULT_TEXTAREA_HEIGHT + 'px';
    this._textarea.nativeElement.value = '';
  }

  submitRequest() {
    // set status
    this._sendReady = false;
    this._isLoading = true;
    this.messageSequenceService.push(this._textarea.nativeElement.value);
    // render default html
    this._contents.push(
      {
        value: this._textarea.nativeElement.value,
        isSelf: true,
        isAi: false,
        isCode: false,
        isError: false,
      },
      {
        value: '',
        isSelf: false,
        isAi: true,
        isCode: false,
        isError: false,
        referenceLink: [],
      }
    );
    // send request api
    this.chatGptService
      .ask(`http://localhost:3000/msg`, this._textarea.nativeElement.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          // console.log(res.result.choices[0].message.content);
          // console.log(res.result.choices);
          if (res) {
            this._contents[this._contents.length - 1].value = res.result;
          }
          // set status
          this._isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this._contents[this._contents.length - 1].value = err.message;
          this._contents[this._contents.length - 1].isError = true;
          this._contents[this._contents.length - 1].isAi = false;
          // set status
          this._isLoading = false;
        },
        complete: () => {},
      });
    this.resetTexarea();
  }
}
