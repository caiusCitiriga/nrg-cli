"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_const_1 = require("./consts/types.const");
const conf_reader_entity_1 = require("./entities/conf-reader.entity");
const nrg_exception_entity_1 = require("./entities/nrg-exception.entity");
const IoCContainer = new inversify_1.Container();
exports.IoCContainer = IoCContainer;
IoCContainer.bind(types_const_1.TYPES.IConfReader).to(conf_reader_entity_1.ConfReader);
IoCContainer.bind(types_const_1.TYPES.INrgException).to(nrg_exception_entity_1.NRGException);
//# sourceMappingURL=inversify.config.js.map