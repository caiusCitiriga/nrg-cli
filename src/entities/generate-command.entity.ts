import { injectable, inject } from "inversify";
import { IFlag } from "smart-cli/dist/interfaces/plain/flag.interface";

import { ICommandRunner } from "../interfaces/command-runner.interface";
import { IConfReader } from "../interfaces/conf-reader.interface";
import { TYPES } from "../consts/types.const";

@injectable()
export class GenerateCommand implements ICommandRunner {
    @inject(TYPES.IConfReader) private _confReader: IConfReader;

    public run(flags: IFlag[]): void {
        console.log(flags);
    }
}