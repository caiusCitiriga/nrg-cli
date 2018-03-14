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
const fs = require("fs");
const inversify_1 = require("inversify");
const dist_1 = require("smart-cli/dist");
const types_const_1 = require("./consts/types.const");
const cli_defaults_config_1 = require("./config/cli-defaults.config");
let EnergyCLI = class EnergyCLI {
    constructor(scaffoldComand, generateComand, initComand) {
        //  Initialization of stuff
        this.initSmartCLI();
        this._cli = new dist_1.SmartCLI();
        this._initComand = initComand;
        this._scaffoldComand = scaffoldComand;
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
            name: 'test',
            flags: [],
            description: 'Test command',
            action: (flags) => {
                this._scaffoldComand.run(flags);
            }
        })
            .addCommand({
            name: 'info',
            flags: [],
            description: 'Prints the current Energy version information',
            action: (flags) => {
                console.log(fs.readdirSync('.'));
                throw new Error();
                // const versionInfo = fs.readFileSync('');
                // this._cli.UI.out.printBoxTitle('ENERGY CLI');
                // this._cli.UI.out.printKeyValues({
                //     set: [
                //         {
                //             k: 'Version number',
                //             v: '1'
                //         }
                //     ]
                // })
            }
        })
            .addCommand({
            name: 'scaffold',
            flags: [
                {
                    name: 'root',
                    description: 'The relative path to use as root folder for the structure to scaffold',
                    options: []
                }
            ],
            description: 'Scaffolds the structure defined in the CLI config file.',
            action: (flags) => {
                this._scaffoldComand
                    .run(flags)
                    .subscribe(res => {
                    if (!!res) {
                        console.log();
                        this._cli.UI.out.printInfo('Structure successfully scaffolded.\n');
                    }
                });
            }
        })
            .addCommand({
            flags: [],
            name: 'init',
            description: 'Initializes a Energy project inside the current folder',
            action: (flags) => {
                const sub = this._initComand
                    .run(flags)
                    .subscribe(res => {
                    console.log();
                    this._cli.UI.out.printInfo(`${cli_defaults_config_1.CLI_CONF_FILENAME} file successfully generated\n`);
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
    __param(0, inversify_1.named(types_const_1.NAMED_TYPES.ScaffoldCommand)),
    __param(1, inversify_1.inject(types_const_1.TYPES.ICommandRunner)),
    __param(1, inversify_1.named(types_const_1.NAMED_TYPES.GenerateCommand)),
    __param(2, inversify_1.inject(types_const_1.TYPES.ICommandRunner)),
    __param(2, inversify_1.named(types_const_1.NAMED_TYPES.InitCommand)),
    __metadata("design:paramtypes", [Object, Object, Object])
], EnergyCLI);
exports.EnergyCLI = EnergyCLI;
//# sourceMappingURL=nrg.js.map