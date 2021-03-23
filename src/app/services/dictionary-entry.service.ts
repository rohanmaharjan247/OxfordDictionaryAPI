import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DictionaryEntryService {
  constructor(private _http: HttpClient) {}

  getWord(language: string, wordId: string) {
    return this._http.get(
      `${environment.api}/entries/${language}/${wordId.toLowerCase()}`,
      {
        headers: new HttpHeaders()
          .set('app_id', environment.appId)
          .set('app_key', environment.appkey),
      }
    );
  }
}
