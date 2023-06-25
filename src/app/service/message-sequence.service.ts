import { Injectable } from '@angular/core';

const MESSAGE_SEQUENCE_LENGTH = 20;

@Injectable({
  providedIn: 'root',
})
export class MessageSequenceService {
  private _messageSequence: string[] = new Array();
  private _currentIndex = 0;

  constructor() {}

  push(str: string): void {
    this._messageSequence.push(str);
    if (this._messageSequence.length > MESSAGE_SEQUENCE_LENGTH) {
      this._messageSequence.shift();
    }
    this._currentIndex = this._messageSequence.length;
  }

  pre(): string | undefined {
    this._moveCurrentIndex(-1);
    return this._messageSequence.at(this._currentIndex);
  }

  next(): string | undefined {
    this._moveCurrentIndex(1);
    return this._messageSequence.at(this._currentIndex);
  }

  private _moveCurrentIndex(value: number): void {
    const lastIndex = this._messageSequence.length - 1;
    const currentIndexTemp = this._currentIndex + value;
    this._currentIndex =
      currentIndexTemp < 0
        ? 0
        : currentIndexTemp > lastIndex
        ? lastIndex
        : currentIndexTemp;
  }
}
