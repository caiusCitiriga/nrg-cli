#! /usr/bin/env node
import * as process from 'process';

import 'rxjs/add/operator/filter';

import { UI } from './core/ui.core';
import { Parser } from './core/dispatcher/parser.core';
import { Dispatcher } from './core/dispatcher/dispatcher.core';

import { CommandFlag } from './interfaces/command-flag.interface';
import { DispatcherOptions } from './interfaces/dispatcher-options.interface';

import { SmartCLI } from 'smart-cli/dist';
import { CommandRunner } from './interfaces/command-runner.interface';
import { HelpCommand } from './core/commands/help.command';

export class EnergyCLI {
    private _parser: Parser;
    private _dispatcher: Dispatcher;
    private _helpCommand: CommandRunner;

    private dispatcherOptions: DispatcherOptions[];

    public constructor() {
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
                    }],
                aliases: ['h'],
                action: (flags) => this._helpCommand.run(this.dispatcherOptions, flags)
            }
        ]

        this._parser = new Parser();
        this._dispatcher = new Dispatcher();
        this._helpCommand = new HelpCommand();
    }

    public start(): void {
        this._dispatcher.dispatch(this.dispatcherOptions, this._parser.getCommandSet());
    }
}

const NRG = new EnergyCLI();
NRG.start();