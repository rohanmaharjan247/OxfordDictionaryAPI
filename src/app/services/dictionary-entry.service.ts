import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryEntryService {

  constructor(private _http:HttpClient) { }

  getWord(language:string, wordId: string){
    return this._http.get(`dictapi/entries/${language}/${wordId.toLowerCase()}`, {
      headers: new HttpHeaders().set('app_id','48c9427e').set('app_key', '525776f887cf5d407d009d64f9fde736')
    })
  }
}
