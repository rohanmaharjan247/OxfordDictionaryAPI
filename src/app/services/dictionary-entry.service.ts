import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DictionaryEntryService {
  apiUrl = '';
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private _http: HttpClient
  ) {
    this.apiUrl = baseUrl;
  }

  getWord(language: string, wordId: string) {
    return this._http.get(

      `${this.apiUrl}dictionarysearch/${language}/${wordId}`,
      {
        headers: new HttpHeaders()
          .set('app_id', environment.appId)
          .set('app_key', environment.appkey),
      }
    );
  }

  // test() {
  //   return this._http.get(`${this.apiUrl}dictionarysearch/en-gb/example`, {
  //     headers: new HttpHeaders()
  //       .set('app_id', environment.appId)
  //       .set('app_key', environment.appkey),
  //   });
  // }
}
