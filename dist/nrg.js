#! /usr/bin/env node
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
const process = require("process");
const inversify_1 = require("inversify");
const types_const_1 = require("./consts/types.const");
const inversify_config_1 = require("./inversify.config");
let EnergyCLI = class EnergyCLI {
    constructor() {
        //  Initialization of stuff
        // this._cli = new SmartCLI();
        console.log(this._generateComand);
        //  Sets all the commands to SmartCLI
        // this.setupCLI();
    }
    /**
     * Runs the CLI program passing the user args.
     *
     * @memberof EnergyCLI
     */
    runProgram() {
        this, this._cli.run(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());
    }
    setupCLI() {
        this._cli
            .addCommand({
            name: 'g',
            description: 'Generates a new item',
            flags: [
                {
                    name: 'dto',
                    description: 'DTO',
                    options: []
                },
                {
                    name: 'enum',
                    description: 'Enum',
                    options: []
                },
                {
                    name: 'model',
                    description: 'Model',
                    options: []
                },
                {
                    name: 'const',
                    description: 'Constant',
                    options: []
                },
                {
                    name: 'entity',
                    description: 'Entity',
                    options: []
                },
                {
                    name: 'int',
                    description: 'Interface',
                    options: []
                }
            ],
            action: (flags) => { }
        });
    }
};
__decorate([
    inversify_1.inject(types_const_1.TYPES.ICommandRunner),
    inversify_1.named(types_const_1.NAMED_TYPES.GenerateCommand),
    __metadata("design:type", Object)
], EnergyCLI.prototype, "_generateComand", void 0);
EnergyCLI = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], EnergyCLI);
exports.EnergyCLI = EnergyCLI;
const cli = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IEnergy);
//# sourceMappingURL=nrg.js.map