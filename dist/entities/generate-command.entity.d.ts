import { IFlag } from "smart-cli/dist/interfaces/plain/flag.interface";
import { ICommandRunner } from "../interfaces/command-runner.interface";
export declare class GenerateCommand implements ICommandRunner {
    private _confReader;
    run(flags: IFlag[]): void;
}
