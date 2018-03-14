import { inject } from "inversify";
import { injectable } from "inversify";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { IFlag } from "smart-cli/dist/interfaces/plain/flag.interface";

import { TYPES } from "../consts/types.const";

import { ConfWriter } from "./conf-writer.entity";

import { IConfWriter } from "../interfaces/conf-writer.interface";
import { ICommandRunner } from "../interfaces/command-runner.interface";

@injectable()
export class InitCommand implements ICommandRunner {
    private _confWriter: IConfWriter;

    public constructor(
        @inject(TYPES.IConfWriter) confWriter: IConfWriter
    ) {
        this._confWriter = confWriter;
    }

    public run(flags: IFlag[]): Observable<boolean> {
        this._confWriter.initConfFile();
        return Observable.of(true);
    }
}