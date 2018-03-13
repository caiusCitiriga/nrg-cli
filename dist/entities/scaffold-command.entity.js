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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const inversify_1 = require("inversify");
const inversify_2 = require("inversify");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const types_const_1 = require("../consts/types.const");
let ScaffoldCommand = class ScaffoldCommand {
    constructor(confReader) {
        this._confReader = confReader;
    }
    run(flags) {
        const jobStatus = new BehaviorSubject_1.BehaviorSubject(false);
        if (flags[0] && flags[0].name === 'root' && flags[0].options[0].value) {
            this.scaffoldStructure({
                rootPath: flags[0].options[0].value.substr(-1, 1) === path.sep ? flags[0].options[0].value : flags[0].options[0].value + path.sep,
                jobStat: jobStatus
            });
            return jobStatus.asObservable();
        }
        this.scaffoldStructure({ rootPath: null, jobStat: jobStatus });
        return jobStatus.asObservable();
    }
    scaffoldStructure(opts) {
        const startPath = opts.rootPath ? opts.rootPath : this._confReader.getSrcFolder() + path.sep;
        const struct = this._confReader.getDefaultProjectStructure();
        const firstLevelFolders = Object.keys(struct);
        this.createFoldersRecursively(firstLevelFolders, struct, startPath);
        opts.jobStat.next(true);
    }
    createFoldersRecursively(folders, struct, startPath) {
        folders.forEach(folder => {
            fs.mkdirSync(startPath + folder);
            if (!!struct[folder]) {
                const recStartPath = startPath + folder + path.sep;
                this.createFoldersRecursively(Object.keys(struct[folder]), struct[folder], recStartPath);
            }
        });
    }
};
ScaffoldCommand = __decorate([
    inversify_2.injectable(),
    __param(0, inversify_1.inject(types_const_1.TYPES.IConfReader)),
    __metadata("design:paramtypes", [Object])
], ScaffoldCommand);
exports.ScaffoldCommand = ScaffoldCommand;
//# sourceMappingURL=scaffold-command.entity.js.map