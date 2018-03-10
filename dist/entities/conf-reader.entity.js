"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fs = require("fs");
const path = require("path");
const process = require("process");
const inversify_1 = require("inversify");
const cli_defaults_config_1 = require("../config/cli-defaults.config");
const exceptions_conts_1 = require("../consts/exceptions.conts");
const cli_defaults_config_2 = require("../config/cli-defaults.config");
const nrg_exception_entity_1 = require("./nrg-exception.entity");
let ConfReader = class ConfReader {
    constructor() {
        this._configFile = null;
        this._cliConfFilename = cli_defaults_config_2.CLI_CONF_FILENAME;
    }
    getSrcFolder() {
        this.readConf();
        return this._configFile.srcFolder;
    }
    getDefaultFilesExt() {
        this.readConf();
        return this._configFile.defaultExt;
    }
    getAdditionalTypes() {
        this.readConf();
        return this._configFile.additionalTypes;
    }
    getCustomFileTemplates() {
        this.readConf();
        return this._configFile.customFileTemplates;
    }
    useDotnetInterfaceStyle() {
        this.readConf();
        return this._configFile.dotnetInterfaceStyle;
    }
    getDefaultProjectStructure() {
    }
    ensureIsEnergyProjectFolder() {
        if (!fs.existsSync(process.cwd() + path.sep + this._cliConfFilename)) {
            new nrg_exception_entity_1.NRGException().throw({
                name: exceptions_conts_1.NRG_EXCEPTIONS.NotAEnergyProjectException.name,
                message: exceptions_conts_1.NRG_EXCEPTIONS.NotAEnergyProjectException.message()
            });
        }
    }
    readConf() {
        this.ensureIsEnergyProjectFolder();
        this._configFile = this.fillMissingConfigurationsWithDefaults();
    }
    fillMissingConfigurationsWithDefaults() {
        const fileContent = JSON.parse(fs.readFileSync(process.cwd() + path.sep + this._cliConfFilename).toString());
        fileContent.srcFolder = fileContent.srcFolder
            ? fileContent.srcFolder
            : cli_defaults_config_1.CLI_DEFAULTS.srcFolder;
        fileContent.defaultExt = fileContent.defaultExt
            ? fileContent.defaultExt
            : cli_defaults_config_1.CLI_DEFAULTS.defaultExt;
        fileContent.additionalTypes = fileContent.additionalTypes
            ? fileContent.additionalTypes
            : cli_defaults_config_1.CLI_DEFAULTS.additionalTypes;
        fileContent.customFileTemplates = fileContent.customFileTemplates
            ? fileContent.customFileTemplates
            : cli_defaults_config_1.CLI_DEFAULTS.customFileTemplates;
        return fileContent;
    }
};
ConfReader = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ConfReader);
exports.ConfReader = ConfReader;
//# sourceMappingURL=conf-reader.entity.js.map