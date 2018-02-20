import { CommandFlag } from "../interfaces/command-flag.interface";
export interface DispatcherCommandSet {
    command: string | null;
    flags: CommandFlag[] | null;
}
