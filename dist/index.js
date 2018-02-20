#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/filter");
const parser_core_1 = require("./core/parser.core");
const dispatcher_core_1 = require("./core/dispatcher.core");
class EnergyCLI {
    constructor() {
        this.dispatcherOptions = [
            {
                command: 'new',
                desc: 'Generates a new AngularX project',
                flags: [],
                aliases: ['n'],
                action: (flags) => {
                    console.log(flags);
                },
            },
            {
                command: 'generate',
                desc: 'Generates a new item',
                flags: [
                    {
                        flag: 'c',
                        desc: 'Angular CLI wrap for component'
                    },
                    {
                        flag: 's',
                        desc: 'Angular CLI wrap for service'
                    },
                    {
                        flag: 'p',
                        desc: 'Angular CLI wrap for pipe'
                    },
                    {
                        flag: 'g',
                        desc: 'Angular CLI wrap for guard'
                    },
                    {
                        flag: 'm',
                        desc: 'Angular CLI wrap for module'
                    },
                    {
                        flag: 'd',
                        desc: 'Angular CLI wrap for directive'
                    },
                    {
                        flag: 'entity',
                        desc: 'Creates a new entity inside the entities folder'
                    },
                    {
                        flag: 'conf',
                        desc: 'Creates a new configuration file inside the configs folder'
                    },
                    {
                        flag: 'const',
                        desc: 'Creates a new constant file inside the consts folder'
                    },
                    {
                        flag: 'core',
                        desc: 'Creates a new core file inside the core folder'
                    },
                    {
                        flag: 'enum',
                        desc: 'Creates a new enum inside the enums folder'
                    },
                    {
                        flag: 'interface',
                        desc: 'Creates a new interface inside the interfaces folder'
                    },
                ],
                aliases: ['g'],
                action: (flags) => {
                    console.log(flags);
                },
            },
        ];
        this._parser = new parser_core_1.Parser();
        this._dispatcher = new dispatcher_core_1.Dispatcher();
    }
    start() {
        this._dispatcher.dispatch(this.dispatcherOptions, this._parser.getCommandSet());
    }
}
exports.EnergyCLI = EnergyCLI;
const NRG = new EnergyCLI();
NRG.start();
//# sourceMappingURL=index.js.map