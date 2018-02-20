import { CommandFlag } from "../interfaces/command-flag.interface";

import { Dispatcher } from "./dispatcher.core";

import { DispatcherCommandSet } from "../entities/dispatcher-command-set.entity";
import { DispatcherOptions } from "../interfaces/dispatcher-options.interface";

export class Parser {
    private userRanArgs: string[] = [];
    private commandSet: DispatcherCommandSet = {
        command: null,
        flags: null
    };

    public constructor() {
        this.cleanupArgs();
    }

    public getCommandSet(): DispatcherCommandSet {
        this.assignCommandSet();
        return this.commandSet;
    }

    /**
     * Extracts the command from the progcess.argv
     */
    private extractRAWCommand(): string {
        return this.userRanArgs[0] + this.userRanArgs[1];
    }

    /**
     * Assigns the command set internally
     */
    private parseRAWCommand(raw_command: string): DispatcherCommandSet {
        const command_set: DispatcherCommandSet = {
            command: null,
            flags: null
        };

        command_set.command = raw_command.split('-')[0].trim(); //  This will take only what's before any flag

        const flags = raw_command.split('-');
        flags.shift(); // remove the command from the flags array;
        command_set.flags = flags.map(f => <CommandFlag>{ flag: f.toLowerCase() });

        return command_set;
    }

    /**
     * Assigns the command set internally
     */
    private assignCommandSet(): void {
        const raw_command = this.extractRAWCommand();
        this.commandSet = this.parseRAWCommand(raw_command);
    }

    /**
     * Leaves inside the array only the user args
     */
    private cleanupArgs() {
        this.userRanArgs = process.argv;
        this.userRanArgs.shift();
        this.userRanArgs.shift();
    }
}
