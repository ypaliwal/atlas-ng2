import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataCallsService } from '../../../services/dataCalls.service';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent  {
    postalCode: string;

    constructor(private _dataCallsSrv: DataCallsService,
                private _router: Router ) {}

    onClick() {
        
        this._dataCallsSrv.mpByPostal(this.postalCode).subscribe(res => {
            this._dataCallsSrv.MPDataByPostal = res;
            this._router.navigate(['/mpData']);
        }, err => {this.logErr(err)});
    }

    logErr(error: any) {
        console.log(error);
        alert("That doesn't seem to be a valid postal code.");
        this.postalCode = "";
    }
}