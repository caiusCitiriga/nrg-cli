import { CORE_COMMANDS } from "../../consts/core-commands.const";

import { CommandFlag } from "../../interfaces/command-flag.interface";
import { CommandRunner } from "../../interfaces/command-runner.interface";
import { DispatcherOptions } from "../../interfaces/dispatcher-options.interface";

export class GenerateCommand implements CommandRunner {
    public run(dispatcherOptions: DispatcherOptions[], flags: CommandFlag[]): void {
        switch (flags[0].flag) {
            case CORE_COMMANDS.generate.flags.item.value:
                this.generateItem(flags[0]);
                break;
        }
    }

    private generateItem(flag: CommandFlag): void {
        console.log(flag.flag);
    }
}