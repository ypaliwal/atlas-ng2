import { Component, OnInit } from '@angular/core';

import { DataCallsService } from '../../../services/dataCalls.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
    moduleId: module.id,
    selector: 'mpData',
    templateUrl: 'mpData.component.html',
    styleUrls: ['mpData.component.css']
})
export class MpDataComponent implements OnInit {
    private mpDataLocal: any;
    private mpDataByName: any;
    private recentVotes: any[];
    private recentVotesValidated: any[] = [];
    private recentVoteCallsMade: number = 0;
    private recentVoteTemp: any;

    private mpDataByNameExists: boolean = false;
    private recentVotesExists: boolean = false;

    private fname: string;
    private lname: string;

    constructor(private _dataCallsSrv: DataCallsService) {
        this.mpDataLocal = this._dataCallsSrv.MPDataByPostal;
        // console.log(this.mpDataLocal);
    }

    ngOnInit() {
        // Grab data from OpenParl API 
        console.log(this.mpDataLocal);
        this.fname = this.mpDataLocal.representatives_centroid[0].first_name.toLowerCase();
        this.lname = this.mpDataLocal.representatives_centroid[0].last_name.toLowerCase();

        // Look up MP data from their name
        this._dataCallsSrv.mpDataByName(this.fname, this.lname)
            .subscribe(res => {
                this._dataCallsSrv.MPDataByName = res;
                this.mpDataByName = res;
                // console.log(res);
                this.mpDataByNameExists = true;
            }, err => {
                console.log(err);
                alert("That doesn't seem to be a valid postal code.");
            });

        this.populateRecentVotes();
    }

    // Populate recentVotes var, with 20 unique votes
    populateRecentVotes() {
        // Grab 20 (more) votes, store in recentVotes, 
        // validate and add to recentVotesValidated
        // Then, if recentVotesValidated < 20, make call again
        if (this.recentVotesValidated.length < 20) {
            this._dataCallsSrv.recentVotes()
                .subscribe(res => {
                    this._dataCallsSrv.RecentVotes = res.objects;
                    this.recentVotes = res.objects;
                    this._dataCallsSrv.openParl_recentVotes_nextUrl = res.pagination.next_url;
                    
                    for(var i = 0; i < this.recentVotes.length; i++) {
                        if (this.recentVotes[i].description.en) {
                            this.recentVoteTemp = this.recentVotes[i];
                            
                            if (this.recentVoteTemp.description.en.length > 140) {
                                this.recentVoteTemp.description.enShort = (this.recentVoteTemp.description.en.substring(0,140) + "...");
                            } else {
                                this.recentVoteTemp.description.enShort = this.recentVoteTemp.description.en; 
                            }
                            
                            this.recentVotesValidated.push(this.recentVoteTemp);
                        }    
                    }

                    if(this.recentVotesValidated.length < 20) {
                        this.populateRecentVotes();
                    }

                    // console.log("This should be an array:");
                    // console.log(res.objects);
                }, err => {
                    console.log(err);
                    alert("Can't grab recent votes");
                });
        } else {
            this.recentVotesExists = true;
        }
    }
    

}