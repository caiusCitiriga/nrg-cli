#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/of");
var types_const_1 = require("./consts/types.const");
var inversify_config_1 = require("./inversify.config");
var NRG = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IEnergy);
NRG.runProgram(process.argv.filter(function (arg, idx) { return idx >= 2; }).join(' ').toString());
//# sourceMappingURL=index.js.map