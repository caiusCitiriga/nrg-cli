"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_config_1 = require("./inversify.config");
const types_const_1 = require("./consts/types.const");
const cli = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IEnergy);
cli.runProgram();
//# sourceMappingURL=main.js.map