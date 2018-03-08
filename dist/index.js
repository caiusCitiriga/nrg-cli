#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/of");
const types_const_1 = require("./consts/types.const");
const inversify_config_1 = require("./inversify.config");
const SCLIEXEPTIONS = require("smart-cli/dist/consts/exceptions.conts");
const NRG = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IEnergy);
try {
    NRG.runProgram(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());
}
catch (e) {
    const ERROR = e;
    if (ERROR.name === SCLIEXEPTIONS.NRG_EXCEPTIONS.NoMatchingCommandException.name) {
        NRG.runProgram('help');
    }
}
//# sourceMappingURL=index.js.map