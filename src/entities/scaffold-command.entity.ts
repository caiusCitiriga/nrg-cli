import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

import { inject } from "inversify";
import { injectable } from "inversify";
import { Observable } from "rxjs/Observable";

import { TYPES } from "../consts/types.const";

import { IFlag } from "smart-cli/dist/interfaces/plain/flag.interface";
import { IConfReader } from "../interfaces/conf-reader.interface";
import { ICommandRunner } from "../interfaces/command-runner.interface";

@injectable()
export class ScaffoldCommand implements ICommandRunner {

    private _confReader: IConfReader;

    public constructor(
        @inject(TYPES.IConfReader) confReader: IConfReader
    ) {
        this._confReader = confReader;
    }

    public run(flags: IFlag[]): Observable<boolean> {
        this.scaffoldStructure();
        return Observable.of(true);
    }

    private scaffoldStructure(): any {
        const struct = this._confReader.getDefaultProjectStructure();

        const firstLevelFolders = Object.keys(struct);
        this.createFoldersRecursively(firstLevelFolders, struct, '.' + path.sep);
    }

    private createFoldersRecursively(folders: string[], struct: any, startPath: string) {
        folders.forEach(folder => {
            fs.mkdirSync(startPath + folder);
            if (!!struct[folder]) {
                const recStartPath = startPath + folder + path.sep;
                this.createFoldersRecursively(Object.keys(struct[folder]), struct[folder], recStartPath);
            }
        });
    }
}
