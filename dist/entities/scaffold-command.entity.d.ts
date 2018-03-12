import { Observable } from "rxjs/Observable";
import { IFlag } from "smart-cli/dist/interfaces/plain/flag.interface";
import { IConfReader } from "../interfaces/conf-reader.interface";
import { ICommandRunner } from "../interfaces/command-runner.interface";
export declare class ScaffoldCommand implements ICommandRunner {
    private _confReader;
    constructor(confReader: IConfReader);
    run(flags: IFlag[]): Observable<boolean>;
    private scaffoldStructure(opts);
    private createFoldersRecursively(folders, struct, startPath);
}
