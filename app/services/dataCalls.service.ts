import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataCallsService {
    // Url variables
    private MPSearchUrl: string;
    private mpDataCallUrl: string;
    
    private openParl_baseUrl: string = "http://api.openparliament.ca/";
    
    public openParl_recentVotes_nextUrl: string = "";

    // Calls' data store
    public MPDataByPostal: any;
    public MPDataByName: any;
    public RecentVotes: any;

    constructor(private _http: Http) {}

    mpByPostal(postalCode: string) {
        this.MPSearchUrl = "http://represent.opennorth.ca/postcodes/" + postalCode + "/?sets=federal-electoral-districts";
        
        return this._http.get(this.MPSearchUrl)
            .map(res => res.json());
    }

    mpDataByName(fname: string, lname: string) {
        this.mpDataCallUrl = "https://api.openparliament.ca/politicians/" + fname + "-" + lname + "/?format=json";

        return this._http.get(this.mpDataCallUrl)
            .map(res => res.json());
    }

    recentVotes() {
        if(this.openParl_recentVotes_nextUrl.length < 2) {
            return this._http.get(this.openParl_baseUrl + "votes/?format=json")
                .map(res => res.json());
        }
        
    }


    // searchMusic(str: string, type='artist') {
    //     this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    //     return this._http.get(this.searchUrl)
    //         .map(res => res.json());
    // }

    // getArtist(id: string) {
    //     this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
    //     return this._http.get(this.artistUrl)
    //         .map(res => res.json());
    // }

    // getAlbums(artistId: string) {
    //     this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums';
    //     return this._http.get(this.albumsUrl)
    //         .map(res => res.json());
    // } 
}