import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DictionaryEntryService } from './services/dictionary-entry.service';

import { from, Observable, of, zip } from 'rxjs';
import { groupBy, mergeMap, reduce, toArray } from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'DictionaryApi';
  loading = false;
  word = new FormControl();
  results = [];
  meanings: string[] = [];
  meaningsandlexicals = [
    {
      meaning: '',
      lexicals: '',
    },
  ];
  meaning: string;
  pronunications = [];
  lexicalCategory = [];
  groupedMeanings: any;
  constructor(private _dictEntryService: DictionaryEntryService) {}

  ngOnInit() {}

  ngAfterViewInit() {}
    //"start": "ng serve --ssl true --ssl-cert ssl\\server.crt --ssl-key=ssl\\server.key",
  getWord() {
    this.loading = true;
    this.groupedMeanings = [];
    this.meaningsandlexicals = [];
    this.results = [];
    this._dictEntryService.getWord('en-gb', this.word.value).subscribe(
      (data: any) => {
        this.results = data.results;
        data.results.forEach((result) => {
          result.lexicalEntries.forEach((lexicalEntry) => {
            this.lexicalCategory.push(lexicalEntry.lexicalCategory.text);
            lexicalEntry.entries.forEach((entry) => {
              this.pronunications = entry.pronunciations;
              entry.senses.forEach((sense) => {
                this.meanings.push(sense.definitions);
                this.meaningsandlexicals.push({
                  meaning: sense.definitions,
                  lexicals: lexicalEntry.lexicalCategory.text,
                });
              });
            });
          });
        });
        this.meaning = this.meanings.join('-');
        this.groupByLexicals();
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.meaningsandlexicals = [];
        this.groupedMeanings = [];
        this.word.setValue('');
        this.results = [];
        this.loading = false;
        if(err.status === 404){
          alert('Given Word Not Found')
        }
      }
    );
  }

  groupByLexicals() {
    from(this.meaningsandlexicals)
      .pipe(
        groupBy((p) => p.lexicals),
        mergeMap((group) =>
          group.pipe(
            reduce(
              (acc, cur) => {
                if (cur.lexicals != '' && cur.meaning != '')
                  acc.values.push(cur);
                return acc;
              },
              {
                key: group.key,
                values: [],
              }
            )
          )
        ),
        toArray()
      )
      .subscribe((data) => {
        this.groupedMeanings = data;
      });
  }
}
