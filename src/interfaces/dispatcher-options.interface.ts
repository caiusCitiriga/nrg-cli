import { CommandFlag } from "./command-flag.interface";

export interface DispatcherOptions {
    command: string;
    desc: string;
    aliases?: string[];
    flags?: CommandFlag[];
    action: (flags: CommandFlag[]) => void
}