import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

import { inject } from "inversify";
import { injectable } from "inversify";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TYPES } from "../consts/types.const";

import { NRGException } from './nrg-exception.entity';

import { IFlag } from "smart-cli/dist/interfaces/plain/flag.interface";
import { IConfReader } from "../interfaces/conf-reader.interface";
import { ICommandRunner } from "../interfaces/command-runner.interface";
import { NRG_EXCEPTIONS } from '../consts/exceptions.conts';

@injectable()
export class ScaffoldCommand implements ICommandRunner {

    private _confReader: IConfReader;

    public constructor(
        @inject(TYPES.IConfReader) confReader: IConfReader
    ) {
        this._confReader = confReader;
    }

    public run(flags: IFlag[]): Observable<boolean> {
        const jobStatus = new BehaviorSubject(false);
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

    private scaffoldStructure(opts: { rootPath: string; jobStat: BehaviorSubject<boolean> }): any {
        const startPath = opts.rootPath ? opts.rootPath : this._confReader.getSrcFolder() + path.sep;
        const struct = this._confReader.getDefaultProjectStructure();

        const firstLevelFolders = Object.keys(struct);
        this.createFoldersRecursively(firstLevelFolders, struct, startPath);
        opts.jobStat.next(true);
    }

    private createFoldersRecursively(folders: string[], struct: any, startPath: string) {
        if (startPath.length && !fs.existsSync(startPath)) {
            fs.mkdir(startPath, err => {
                if (err) {
                    new NRGException().throw({
                        name: NRG_EXCEPTIONS.InvalidRootFolderForScaffoldException.name,
                        message: NRG_EXCEPTIONS.InvalidRootFolderForScaffoldException.message(startPath),
                    });
                }
            });
        }

        folders.forEach(folder => {
            if (!fs.existsSync(startPath + folder)) {
                fs.mkdirSync(startPath + folder);
            }

            if (!!struct[folder]) {
                const recStartPath = startPath + folder + path.sep;
                this.createFoldersRecursively(Object.keys(struct[folder]), struct[folder], recStartPath);
            }
        });
    }
}
