import { CommandFlag } from "./command-flag.interface";
export interface ActionsCallbackBindings {
    newCmd: (flags: CommandFlag[]) => void;
    initCmd: (flags: CommandFlag[]) => void;
    helpCmd: (flags: CommandFlag[]) => void;
    generateCmd: (flags: CommandFlag[]) => void;
}
