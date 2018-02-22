import { CommandFlag } from "../../interfaces/command-flag.interface";
import { CommandRunner } from "../../interfaces/command-runner.interface";
import { DispatcherOptions } from "../../interfaces/dispatcher-options.interface";
export declare class GenerateCommand implements CommandRunner {
    run(dispatcherOptions: DispatcherOptions[], flags: CommandFlag[]): void;
    private generateItem(flag);
}
