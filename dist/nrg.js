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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("rxjs/add/operator/filter");
const inversify_1 = require("inversify");
const dist_1 = require("smart-cli/dist");
const types_const_1 = require("./consts/types.const");
let EnergyCLI = class EnergyCLI {
    constructor(generateComand) {
        //  Initialization of stuff
        this._cli = new dist_1.SmartCLI();
        this._generateComand = generateComand;
        // Sets all the commands to SmartCLI
        this.setupCLI();
    }
    /**
     * Runs the program with the given args
     *
     * @param {string} args
     * @memberof EnergyCLI
     */
    runProgram(args) {
        this, this._cli.run(args);
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
            action: (flags) => {
                console.log(JSON.stringify(flags));
                this._generateComand
                    .run(flags)
                    .filter(res => !!res)
                    .subscribe(res => this._cli.UI.out.printInfo('Item generated successfully!'));
            }
        });
    }
};
EnergyCLI = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_const_1.TYPES.ICommandRunner)),
    __param(0, inversify_1.named(types_const_1.NAMED_TYPES.GenerateCommand)),
    __metadata("design:paramtypes", [Object])
], EnergyCLI);
exports.EnergyCLI = EnergyCLI;
//# sourceMappingURL=nrg.js.map