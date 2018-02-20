"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    constructor() {
        this.userRanArgs = [];
        this.commandSet = {
            command: null,
            flags: null
        };
        this.cleanupArgs();
    }
    getCommandSet() {
        this.assignCommandSet();
        return this.commandSet;
    }
    /**
     * Extracts the command from the progcess.argv
     */
    extractRAWCommand() {
        return this.userRanArgs[0] + this.userRanArgs[1];
    }
    /**
     * Assigns the command set internally
     */
    parseRAWCommand(raw_command) {
        const command_set = {
            command: null,
            flags: null
        };
        command_set.command = raw_command.split('-')[0].trim(); //  This will take only what's before any flag
        const flags = raw_command.split('-');
        flags.shift(); // remove the command from the flags array;
        command_set.flags = flags.map(f => ({ flag: f.toLowerCase() }));
        return command_set;
    }
    /**
     * Assigns the command set internally
     */
    assignCommandSet() {
        const raw_command = this.extractRAWCommand();
        this.commandSet = this.parseRAWCommand(raw_command);
    }
    /**
     * Leaves inside the array only the user args
     */
    cleanupArgs() {
        this.userRanArgs = process.argv;
        this.userRanArgs.shift();
        this.userRanArgs.shift();
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.core.js.map