import { CommandFlag } from "../../interfaces/command-flag.interface";
import { CommandRunner } from "../../interfaces/command-runner.interface";
import { DispatcherOptions } from "../../interfaces/dispatcher-options.interface";
export declare class HelpCommand implements CommandRunner {
    run(dispatcherOpts: DispatcherOptions[], flags: CommandFlag[]): void;
    private runWithFlags(dispatcherOpts, flags);
    private printSpecificCommandHelp(kvpOpts);
}
