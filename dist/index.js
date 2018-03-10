#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/of");
const SCLIEXEPTIONS = require("smart-cli/dist/consts/exceptions.conts");
const types_const_1 = require("./consts/types.const");
const exceptions_conts_1 = require("./consts/exceptions.conts");
const inversify_config_1 = require("./inversify.config");
const NRG = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IEnergy);
try {
    NRG.runProgram(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());
}
catch (e) {
    const ERROR = e;
    let warnWasThrown = false;
    const UI = NRG._cli.UI;
    if (ERROR.name === SCLIEXEPTIONS.NRG_EXCEPTIONS.NoMatchingCommandException.name) {
        warnWasThrown = true;
        NRG.runProgram('help');
    }
    if (ERROR.name === exceptions_conts_1.NRG_EXCEPTIONS.MissingItemTypeFlagException.name) {
        warnWasThrown = true;
        console.log();
        UI.out.printWarning(`${e.message}\n`);
    }
    if (!warnWasThrown) {
        console.log();
        UI.out.printError(`${e.name}\nMESSAGE: ${e.message}\n`);
    }
}
//# sourceMappingURL=index.js.map