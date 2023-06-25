import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatGptService {
  constructor(private http: HttpClient) {}

  ask(url: string, data: string): Observable<any> {
    return this.http.post(url, { data });
  }
}
