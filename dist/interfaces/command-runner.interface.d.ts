import { CommandFlag } from "./command-flag.interface";
import { DispatcherOptions } from "./dispatcher-options.interface";
export interface CommandRunner {
    run(dispatcherOptions: DispatcherOptions[], flags: CommandFlag[]): void;
}
