#! /usr/bin/env node
import * as process from 'process';
import { SmartCLI } from 'smart-cli/dist';

import "rxjs/add/observable/zip";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
import { CORE_COMMANDS } from './consts/core-commands.const';

export class EnergyCLI {
    private _parser: Parser;
    private _factory: Factory;
    private _dispatcher: Dispatcher;
    private _helpCommand: CommandRunner;
    private _generateCommand: CommandRunner;

    private _dispatcherOptions: DispatcherOptions[];
    private _parentCtorInitialized: BehaviorSubject<boolean>;

    public constructor() {
        //  Shitty TS doesn't understand that in strict mode these instances can be intialized into another method
        //  Need to do it ALL here -,-''

        //  Mock these instances at first, they will be assigned by the factory
        this._parser = {} as Parser;
        this._dispatcher = {} as Dispatcher;
        this._helpCommand = {} as HelpCommand;
        this._generateCommand = {} as GenerateCommand;

        //  Core class properties initialization
        const dispatcherOPTS = DEFAULT_DISPATCHER_OPTS;
        dispatcherOPTS.assignCallbackToCommand(CORE_COMMANDS.new.command, (flags) => console.log('called new command'));
        dispatcherOPTS.assignCallbackToCommand(CORE_COMMANDS.init.command, (flags) => console.log('called init command'));
        dispatcherOPTS.assignCallbackToCommand(CORE_COMMANDS.help.command, (flags) => console.log('called help command'));
        dispatcherOPTS.assignCallbackToCommand(CORE_COMMANDS.generate.command, (flags) => console.log('called generate command'));
        this._dispatcherOptions = dispatcherOPTS.options;

        this._parentCtorInitialized = new BehaviorSubject(false);

        //  Init factory and check that is successfully initialized
        this._factory = new Factory(this._dispatcherOptions, this._parentCtorInitialized);
        if (!(this._factory instanceof Factory)) {
            throw new Error('Couldn\'t initialize the FACTORY');
        }
        (global as any)['factory'] = this._factory;

        //  Wait the value from all the instances and bind them all at once. Then unsubscribe by setting the val to false
        this._parser = this._factory.getInstance<Parser>(AvailableInstances.parser);
        this._dispatcher = this._factory.getInstance<Dispatcher>(AvailableInstances.dispatcher);
        this._helpCommand = this._factory.getInstance<HelpCommand>(AvailableInstances.helpCommand);
        this._generateCommand = this._factory.getInstance<GenerateCommand>(AvailableInstances.generateCommand);

        //  Tell the dispatcher that it can start dispatching commands from now on
        this._parentCtorInitialized.next(true);
        this._dispatcher.dispatch(this._dispatcherOptions, this._parser.getCommandSet());
    }
}

const NRG = new EnergyCLI();