"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fs = require("fs");
const inversify_1 = require("inversify");
const cli_defaults_config_1 = require("../config/cli-defaults.config");
let ConfWriter = class ConfWriter {
    initConfFile() {
        fs.writeFileSync('./energy.cli.json', JSON.stringify(cli_defaults_config_1.CLI_DEFAULTS));
        return true;
    }
};
ConfWriter = __decorate([
    inversify_1.injectable()
], ConfWriter);
exports.ConfWriter = ConfWriter;
//# sourceMappingURL=conf-writer.entity.js.map