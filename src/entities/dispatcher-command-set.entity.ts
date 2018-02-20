import { CommandFlag } from "../interfaces/command-flag.interface";

export class DispatcherCommandSet {
    command: string | null = null;
    flags: CommandFlag[] | null = null;
}
