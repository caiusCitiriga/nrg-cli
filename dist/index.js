#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/filter");
const parser_core_1 = require("./core/dispatcher/parser.core");
const dispatcher_core_1 = require("./core/dispatcher/dispatcher.core");
const help_command_1 = require("./core/commands/help.command");
class EnergyCLI {
    constructor() {
        this.dispatcherOptions = [
            {
                command: 'init',
                desc: 'Initializes a new AngularX project inside the current folder',
                flags: [],
                aliases: ['i'],
                action: (flags) => {
                },
            },
            {
                command: 'new',
                desc: 'Generates a new AngularX project',
                flags: [],
                aliases: ['n'],
                action: (flags) => {
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
                        flag: 'item',
                        desc: 'Creates a new project item.'
                    }
                ],
                aliases: ['g'],
                action: (flags) => {
                },
            },
            {
                command: 'help',
                desc: 'Shows the help for each command. Type help [-command] to see details',
                flags: [
                    {
                        flag: 'new',
                        desc: 'Shows flags and detailed info about the NEW command'
                    },
                    {
                        flag: 'generate',
                        desc: 'Shows flags and detailed info about the GENERATE command'
                    }
                ],
                aliases: ['h'],
                action: (flags) => this._helpCommand.run(this.dispatcherOptions, flags)
            }
        ];
        this._parser = new parser_core_1.Parser();
        this._dispatcher = new dispatcher_core_1.Dispatcher();
        this._helpCommand = new help_command_1.HelpCommand();
    }
    start() {
        this._dispatcher.dispatch(this.dispatcherOptions, this._parser.getCommandSet());
    }
}
exports.EnergyCLI = EnergyCLI;
const NRG = new EnergyCLI();
NRG.start();
//# sourceMappingURL=index.js.map