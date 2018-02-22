#! /usr/bin/env node
import * as process from 'process';
import { SmartCLI } from 'smart-cli/dist';

import "rxjs/add/observable/zip";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CORE_COMMANDS } from './consts/core-commands.const';
import { AvailableInstances } from './enums/available-instances.enum';

import { DEFAULT_DISPATCHER_OPTS } from './consts/default-dispatcher-options.const';

import { UI } from './core/ui.core';
import { Factory } from './core/factory/factory.core';
import { Parser } from './core/dispatcher/parser.core';
import { Dispatcher } from './core/dispatcher/dispatcher.core';

import { HelpCommand } from './core/commands/help.command';
import { GenerateCommand } from './core/commands/generate.command';

import { CommandFlag } from './interfaces/command-flag.interface';
import { CommandRunner } from './interfaces/command-runner.interface';
import { DispatcherOptions } from './interfaces/dispatcher-options.interface';
import { ActionsCallbackBindings } from './interfaces/actions-callback-bindings.interface';

export class EnergyCLI {
    private _parser: Parser;
    private _factory: Factory;
    private _dispatcher: Dispatcher;
    private _helpCommand: CommandRunner;
    private _generateCommand: CommandRunner;

    private _dispatcherOptions: DispatcherOptions[];
    private _parentCtorInitialized: BehaviorSubject<boolean>;

    public constructor() {
        //  Core class properties initialization
        this._dispatcherOptions = DEFAULT_DISPATCHER_OPTS.options;
        this._parentCtorInitialized = new BehaviorSubject(false);

        //  Init factory and check that is successfully initialized
        this._factory = new Factory(this._dispatcherOptions, this._parentCtorInitialized);
        if (!(this._factory instanceof Factory)) {
            throw new Error('Couldn\'t initialize the FACTORY');
        }

        this._parser = this._factory.getInstance<Parser>(AvailableInstances.parser);
        this._dispatcher = this._factory.getInstance<Dispatcher>(AvailableInstances.dispatcher);
        this._helpCommand = this._factory.getInstance<HelpCommand>(AvailableInstances.helpCommand);
        this._generateCommand = this._factory.getInstance<GenerateCommand>(AvailableInstances.generateCommand);

        const callbacksBinding: ActionsCallbackBindings = {
            newCmd: (flags: CommandFlag[]) => console.log('Called new command'),
            initCmd: (flags: CommandFlag[]) => console.log('Called init command'),
            helpCmd: (flags: CommandFlag[]) => this._helpCommand.run(this._dispatcherOptions, flags),
            generateCmd: (flags: CommandFlag[]) => this._generateCommand.run(this._dispatcherOptions, flags),
        };

        this.assignActionsToDispatcherCommands(callbacksBinding);

        //  Tell the dispatcher that it can start dispatching commands from now on
        this._parentCtorInitialized.next(true);
        this._dispatcher.dispatch(this._dispatcherOptions, this._parser.getCommandSet());
    }

    private assignActionsToDispatcherCommands(bindings: ActionsCallbackBindings): DispatcherOptions[] {
        const dispatcherOPTS = DEFAULT_DISPATCHER_OPTS;
        dispatcherOPTS.assignCallbackToCommand(CORE_COMMANDS.new.command, bindings.newCmd);
        dispatcherOPTS.assignCallbackToCommand(CORE_COMMANDS.init.command, bindings.initCmd);
        dispatcherOPTS.assignCallbackToCommand(CORE_COMMANDS.help.command, bindings.helpCmd);
        dispatcherOPTS.assignCallbackToCommand(CORE_COMMANDS.generate.command, bindings.generateCmd);
        return dispatcherOPTS.options;
    }
}

const NRG = new EnergyCLI();