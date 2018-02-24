import { DispatcherCommandSet } from "../../interfaces/dispatcher-command-set.interface";
export declare class Parser {
    private userRanArgs;
    private commandSet;
    constructor();
    getCommandSet(): DispatcherCommandSet;
    /**
     * Extracts the command from the progcess.argv
     */
    private extractRAWCommand();
    /**
     * Assigns the command set internally
     */
    private parseRAWCommand(raw_command);
    /**
     * Assigns the command set internally
     */
    private assignCommandSet();
    /**
     * Leaves inside the array only the user args
     */
    private cleanupArgs();
}
