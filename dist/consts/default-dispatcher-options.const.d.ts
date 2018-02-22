import { DispatcherOptions } from "../interfaces/dispatcher-options.interface";
import { CommandFlag } from "../interfaces/command-flag.interface";
export declare const DEFAULT_DISPATCHER_OPTS: {
    assignCallbackToCommand: (command: string, callback: (flags: CommandFlag[]) => void) => void;
    options: DispatcherOptions[];
};
