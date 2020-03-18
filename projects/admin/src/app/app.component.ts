import { Component, OnInit } from '@angular/core';
import { AuthorDataService } from './shared/services/author-data.service';
import { Observable } from 'rxjs';
import { Author } from './models/author';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Country } from './models/country';

@Component({
    selector: 'aa-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'admin';

    author$: Observable<Author[]>;
    countries$: Observable<Country[]>;

    gridState = {
        take: 50,
        skip: 0,
        sort: 'AuthorName',
    };

    formGroup: FormGroup;
    private editedRowIndex: number;

    /**
     *
     */
    constructor(private data: AuthorDataService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.author$ = this.data.getAuthors();
        this.countries$ = this.data.getCountries();
    }

    editHandler({ sender, rowIndex, dataItem }) {
        console.log(sender);
        console.log(rowIndex);
        console.log(dataItem);

        this.closeEditor(sender);
        this.formGroup = this.fb.group({
            AuthorName: [dataItem.AuthorName],
            CountryId: [dataItem.Country.CountryId],
        });

        this.editedRowIndex = rowIndex;

        sender.editRow(rowIndex, this.formGroup);
    }

    cancelHandler($event) {
        console.log($event);
    }

    public saveHandler({ sender, rowIndex, formGroup, isNew }) {
        const author: Author = formGroup.value;
        console.log('author', author);

        // this.editService.save(product, isNew);

        sender.closeRow(rowIndex);
    }

    onStateChange($event) {
        console.log($event);
    }

    removeHandler($event) {
        console.log($event);
    }

    addHandler({ sender }) {
        console.log(sender);
        this.closeEditor(sender);

        this.formGroup = this.fb.group({
            AuthorName: [''],
            CountryId: [1],
        });

        sender.addRow(this.formGroup);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }
}
