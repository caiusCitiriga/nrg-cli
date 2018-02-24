import { SmartCLI } from "smart-cli/dist";

import { CommandFlag } from "../../interfaces/command-flag.interface";
import { CommandRunner } from "../../interfaces/command-runner.interface";
import { DispatcherOptions } from "../../interfaces/dispatcher-options.interface";
import { CORE_COMMANDS } from "../../consts/core-commands.const";
import { UI } from "../ui.core";

export class HelpCommand implements CommandRunner {

    public run(dispatcherOpts: DispatcherOptions[], flags: CommandFlag[]): void {
        if (flags.length) {
            this.runWithFlags(dispatcherOpts, flags);
            return;
        }

        const kvpOpts: { key: string, value: string }[] = [];

        dispatcherOpts.forEach(opt => {
            kvpOpts.push({ key: opt.command, value: opt.desc });
        });

        console.log();
        SmartCLI.GenericOutput.printKeyValue(kvpOpts);
        console.log();
    }

    private runWithFlags(dispatcherOpts: DispatcherOptions[], flags: CommandFlag[]): void {
        flags.forEach(f => {
            let concernedDispatcherOpts: DispatcherOptions | null = null;
            const kvp: { key: string, value: string }[] = [];

            switch (f.flag) {
                case CORE_COMMANDS.init.command:
                    concernedDispatcherOpts = dispatcherOpts.find(o => o.command === CORE_COMMANDS.init.command) as DispatcherOptions;
                    break;
                case CORE_COMMANDS.new.command:
                    concernedDispatcherOpts = dispatcherOpts.find(o => o.command === CORE_COMMANDS.new.command) as DispatcherOptions;
                    break;
                case CORE_COMMANDS.generate.command:
                    concernedDispatcherOpts = dispatcherOpts.find(o => o.command === CORE_COMMANDS.generate.command) as DispatcherOptions;
                    break;
                case CORE_COMMANDS.help.command:
                    concernedDispatcherOpts = dispatcherOpts.find(o => o.command === CORE_COMMANDS.help.command) as DispatcherOptions;
            }

            if (!concernedDispatcherOpts) {
                throw new EvalError('No dispatcher configuration was found for matching command');
            }

            (concernedDispatcherOpts.flags as CommandFlag[]).forEach(cf => {
                kvp.push({ key: cf.flag, value: cf.desc });
            });

            console.log();
            SmartCLI.GenericOutput.printBoxedTitle('nrg ' + concernedDispatcherOpts.command);
            UI.print(concernedDispatcherOpts.desc);

            if (kvp.length) {
                UI.print(`Below, all the ${kvp.length} flags:`, true);
                SmartCLI.GenericOutput.printKeyValue(kvp);
                console.log();
                return;
            }

            UI.print(`This command runs without any flag`, true);
        });
    }

    private printSpecificCommandHelp(kvpOpts: { key: string; value: string }[]): void {
        SmartCLI.GenericOutput.printKeyValue(kvpOpts);
    }
}