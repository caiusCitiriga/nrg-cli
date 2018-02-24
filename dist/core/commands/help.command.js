"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = require("smart-cli/dist");
const core_commands_const_1 = require("../../consts/core-commands.const");
const ui_core_1 = require("../ui.core");
class HelpCommand {
    run(dispatcherOpts, flags) {
        if (flags.length) {
            this.runWithFlags(dispatcherOpts, flags);
            return;
        }
        const kvpOpts = [];
        dispatcherOpts.forEach(opt => {
            kvpOpts.push({ key: opt.command, value: opt.desc });
        });
        console.log();
        dist_1.SmartCLI.GenericOutput.printKeyValue(kvpOpts);
        console.log();
    }
    runWithFlags(dispatcherOpts, flags) {
        flags.forEach(f => {
            let concernedDispatcherOpts = null;
            const kvp = [];
            switch (f.flag) {
                case core_commands_const_1.CORE_COMMANDS.init.command:
                    concernedDispatcherOpts = dispatcherOpts.find(o => o.command === core_commands_const_1.CORE_COMMANDS.init.command);
                    break;
                case core_commands_const_1.CORE_COMMANDS.new.command:
                    concernedDispatcherOpts = dispatcherOpts.find(o => o.command === core_commands_const_1.CORE_COMMANDS.new.command);
                    break;
                case core_commands_const_1.CORE_COMMANDS.generate.command:
                    concernedDispatcherOpts = dispatcherOpts.find(o => o.command === core_commands_const_1.CORE_COMMANDS.generate.command);
                    break;
                case core_commands_const_1.CORE_COMMANDS.help.command:
                    concernedDispatcherOpts = dispatcherOpts.find(o => o.command === core_commands_const_1.CORE_COMMANDS.help.command);
            }
            if (!concernedDispatcherOpts) {
                throw new EvalError('No dispatcher configuration was found for matching command');
            }
            concernedDispatcherOpts.flags.forEach(cf => {
                kvp.push({ key: cf.flag, value: cf.desc });
            });
            console.log();
            dist_1.SmartCLI.GenericOutput.printBoxedTitle('nrg ' + concernedDispatcherOpts.command);
            ui_core_1.UI.print(concernedDispatcherOpts.desc);
            if (kvp.length) {
                ui_core_1.UI.print(`Below, all the ${kvp.length} flags:`, true);
                dist_1.SmartCLI.GenericOutput.printKeyValue(kvp);
                console.log();
                return;
            }
            ui_core_1.UI.print(`This command runs without any flag`, true);
        });
    }
    printSpecificCommandHelp(kvpOpts) {
        dist_1.SmartCLI.GenericOutput.printKeyValue(kvpOpts);
    }
}
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=help.command.js.map