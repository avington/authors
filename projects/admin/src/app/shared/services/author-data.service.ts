import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../../models/author';
import { Country } from '../../models/country';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthorDataService {
    constructor(private http: HttpClient) {}

    getAuthors() {
        return this.http.get<Author[]>('http://localhost:4200/assets/json/authors.json');
    }

    getCountries() {
        return this.http
            .get<Country[]>('http://localhost:4200/assets/json/countries.json')
            .pipe(publishReplay(1), refCount());
    }
}
