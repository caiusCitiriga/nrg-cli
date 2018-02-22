"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_commands_const_1 = require("../../consts/core-commands.const");
class GenerateCommand {
    run(dispatcherOptions, flags) {
        switch (flags[0].flag) {
            case core_commands_const_1.CORE_COMMANDS.generate.flags.item.value:
                this.generateItem(flags[0]);
                break;
        }
    }
    generateItem(flag) {
        console.log(flag.flag);
    }
}
exports.GenerateCommand = GenerateCommand;
//# sourceMappingURL=generate.command.js.map