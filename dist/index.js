"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_const_1 = require("./consts/types.const");
const inversify_config_1 = require("./inversify.config");
inversify_config_1.IoCContainer
    .get(types_const_1.TYPES.IEnergy)
    .runProgram();
//# sourceMappingURL=index.js.map