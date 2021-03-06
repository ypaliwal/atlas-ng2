"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var DataCallsService = (function () {
    function DataCallsService(_http) {
        this._http = _http;
        this.openParl_baseUrl = "http://api.openparliament.ca/";
        this.openParl_recentVotes_nextUrl = "";
    }
    DataCallsService.prototype.mpByPostal = function (postalCode) {
        this.MPSearchUrl = "http://represent.opennorth.ca/postcodes/" + postalCode + "/?sets=federal-electoral-districts";
        return this._http.get(this.MPSearchUrl)
            .map(function (res) { return res.json(); });
    };
    DataCallsService.prototype.mpDataByName = function (fname, lname) {
        this.mpDataCallUrl = "https://api.openparliament.ca/politicians/" + fname + "-" + lname + "/?format=json";
        return this._http.get(this.mpDataCallUrl)
            .map(function (res) { return res.json(); });
    };
    DataCallsService.prototype.recentVotes = function () {
        if (this.openParl_recentVotes_nextUrl.length < 2) {
            return this._http.get(this.openParl_baseUrl + "votes/?format=json")
                .map(function (res) { return res.json(); });
        }
    };
    DataCallsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataCallsService);
    return DataCallsService;
}());
exports.DataCallsService = DataCallsService;
//# sourceMappingURL=dataCalls.service.js.map