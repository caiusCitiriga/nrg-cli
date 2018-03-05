"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_const_1 = require("./consts/types.const");
const nrg_1 = require("./nrg");
const conf_reader_entity_1 = require("./entities/conf-reader.entity");
const nrg_exception_entity_1 = require("./entities/nrg-exception.entity");
const generate_command_entity_1 = require("./entities/generate-command.entity");
const IoCContainer = new inversify_1.Container();
exports.IoCContainer = IoCContainer;
IoCContainer.bind(types_const_1.TYPES.IEnergy).to(nrg_1.EnergyCLI);
IoCContainer.bind(types_const_1.TYPES.IConfReader).to(conf_reader_entity_1.ConfReader);
IoCContainer.bind(types_const_1.TYPES.INrgException).to(nrg_exception_entity_1.NRGException);
IoCContainer.bind(types_const_1.TYPES.ICommandRunner).to(generate_command_entity_1.GenerateCommand).whenTargetNamed(types_const_1.NAMED_TYPES.GenerateCommand);
//# sourceMappingURL=inversify.config.js.map