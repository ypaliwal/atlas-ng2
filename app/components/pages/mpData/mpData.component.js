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
var dataCalls_service_1 = require('../../../services/dataCalls.service');
var MpDataComponent = (function () {
    function MpDataComponent(_dataCallsSrv) {
        this._dataCallsSrv = _dataCallsSrv;
        this.recentVotesValidated = [];
        this.recentVoteCallsMade = 0;
        this.mpDataByNameExists = false;
        this.recentVotesExists = false;
        this.mpDataLocal = this._dataCallsSrv.MPDataByPostal;
        // console.log(this.mpDataLocal);
    }
    MpDataComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Grab data from OpenParl API 
        console.log(this.mpDataLocal);
        this.fname = this.mpDataLocal.representatives_centroid[0].first_name.toLowerCase();
        this.lname = this.mpDataLocal.representatives_centroid[0].last_name.toLowerCase();
        // Look up MP data from their name
        this._dataCallsSrv.mpDataByName(this.fname, this.lname)
            .subscribe(function (res) {
            _this._dataCallsSrv.MPDataByName = res;
            _this.mpDataByName = res;
            // console.log(res);
            _this.mpDataByNameExists = true;
        }, function (err) {
            console.log(err);
            alert("That doesn't seem to be a valid postal code.");
        });
        this.populateRecentVotes();
    };
    // Populate recentVotes var, with 20 unique votes
    MpDataComponent.prototype.populateRecentVotes = function () {
        var _this = this;
        // Grab 20 (more) votes, store in recentVotes, 
        // validate and add to recentVotesValidated
        // Then, if recentVotesValidated < 20, make call again
        if (this.recentVotesValidated.length < 20) {
            this._dataCallsSrv.recentVotes()
                .subscribe(function (res) {
                _this._dataCallsSrv.RecentVotes = res.objects;
                _this.recentVotes = res.objects;
                _this._dataCallsSrv.openParl_recentVotes_nextUrl = res.pagination.next_url;
                for (var i = 0; i < _this.recentVotes.length; i++) {
                    if (_this.recentVotes[i].description.en) {
                        _this.recentVoteTemp = _this.recentVotes[i];
                        if (_this.recentVoteTemp.description.en.length > 140) {
                            _this.recentVoteTemp.description.enShort = (_this.recentVoteTemp.description.en.substring(0, 140) + "...");
                        }
                        else {
                            _this.recentVoteTemp.description.enShort = _this.recentVoteTemp.description.en;
                        }
                        _this.recentVotesValidated.push(_this.recentVoteTemp);
                    }
                }
                if (_this.recentVotesValidated.length < 20) {
                    _this.populateRecentVotes();
                }
                // console.log("This should be an array:");
                // console.log(res.objects);
            }, function (err) {
                console.log(err);
                alert("Can't grab recent votes");
            });
        }
        else {
            this.recentVotesExists = true;
        }
    };
    MpDataComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mpData',
            templateUrl: 'mpData.component.html',
            styleUrls: ['mpData.component.css']
        }), 
        __metadata('design:paramtypes', [dataCalls_service_1.DataCallsService])
    ], MpDataComponent);
    return MpDataComponent;
}());
exports.MpDataComponent = MpDataComponent;
//# sourceMappingURL=mpData.component.js.map