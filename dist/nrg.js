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
    constructor(generateComand, initComand) {
        //  Initialization of stuff
        this.initSmartCLI();
        this._cli = new dist_1.SmartCLI();
        this._initComand = initComand;
        this._generateComand = generateComand;
    }
    /**
     * Runs the program with the given args
     *
     * @param {string} args
     * @memberof EnergyCLI
     */
    runProgram(args) {
        //  To prevent commands duplicates into SmartCLI using the same instance
        this.initSmartCLI();
        // Sets all the commands to SmartCLI
        this.setupCLI();
        this._cli.run(args);
    }
    initSmartCLI() {
        this._cli = new dist_1.SmartCLI();
    }
    setupCLI() {
        this._cli
            .addCommand({
            flags: [],
            name: 'init',
            description: 'Initializes a Energy project inside the current folder',
            action: (flags) => {
                const sub = this._initComand
                    .run(flags)
                    .subscribe(res => {
                    this._cli.UI.out.printInfo('energy.cli.json file successfully generated');
                    return sub.unsubscribe();
                });
            }
        })
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
                const sub = this._generateComand
                    .run(flags)
                    .filter(res => !!res)
                    .subscribe(res => {
                    this._cli.UI.out.printInfo('Item generated successfully!');
                    return sub.unsubscribe();
                });
            }
        });
    }
};
EnergyCLI = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_const_1.TYPES.ICommandRunner)),
    __param(0, inversify_1.named(types_const_1.NAMED_TYPES.GenerateCommand)),
    __param(1, inversify_1.inject(types_const_1.TYPES.ICommandRunner)),
    __param(1, inversify_1.named(types_const_1.NAMED_TYPES.InitCommand)),
    __metadata("design:paramtypes", [Object, Object])
], EnergyCLI);
exports.EnergyCLI = EnergyCLI;
//# sourceMappingURL=nrg.js.map