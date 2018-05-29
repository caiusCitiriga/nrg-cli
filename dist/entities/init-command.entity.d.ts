import { Observable } from "rxjs/Observable";
import { IFlag } from "smart-cli/dist/interfaces/plain/flag.interface";
import { IConfWriter } from "../interfaces/conf-writer.interface";
import { ICommandRunner } from "../interfaces/command-runner.interface";
export declare class InitCommand implements ICommandRunner {
    private _confWriter;
    constructor(confWriter: IConfWriter);
    run(flags: IFlag[]): Observable<boolean>;
}
