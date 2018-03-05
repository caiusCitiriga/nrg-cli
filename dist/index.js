#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
const dist_1 = require("smart-cli/dist");
const types_const_1 = require("./consts/types.const");
const inversify_config_1 = require("./inversify.config");
class EnergyCLI {
    constructor() {
        //  Initialization of stuff
        this._cli = new dist_1.SmartCLI();
        this._confReader = inversify_config_1.IoCContainer.get(types_const_1.TYPES.IConfReader);
        console.log(this._confReader.getSrcFolder());
        console.log(this._confReader.getAdditionalTypes());
        console.log(this._confReader.getDefaultFilesExt());
        //  Sets all the commands to SmartCLI
        this.setupCLI();
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
            action: (flags) => {
                const itemType = flags[0].name;
                const itemFileName = flags[0].options[0].value;
                const itemFileExtension = 'ts';
            }
        });
    }
}
exports.EnergyCLI = EnergyCLI;
new EnergyCLI()
    .runProgram();
//# sourceMappingURL=index.js.map