#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process = require("process");
const dist_1 = require("smart-cli/dist");
const item_types_enum_1 = require("./enums/item-types.enum");
class EnergyCLI {
    constructor() {
        this._cli = new dist_1.SmartCLI();
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
                switch (itemType.toLowerCase()) {
                    //  dto
                    case item_types_enum_1.ItemTypes[0]:
                        break;
                }
            }
        })
            .run(process.argv.filter((arg, idx) => idx >= 2).join(' ').toString());
    }
}
exports.EnergyCLI = EnergyCLI;
new EnergyCLI();
//# sourceMappingURL=index.js.map