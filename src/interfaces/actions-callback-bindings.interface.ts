import { CommandFlag } from "./command-flag.interface";

export interface ActionsCallbackBindings {
    setCmd: (flags: CommandFlag[]) => void;
    newCmd: (flags: CommandFlag[]) => void;
    initCmd: (flags: CommandFlag[]) => void;
    helpCmd: (flags: CommandFlag[]) => void;
    generateCmd: (flags: CommandFlag[]) => void;
}