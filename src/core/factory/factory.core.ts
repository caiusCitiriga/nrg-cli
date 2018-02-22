import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { AvailableInstances } from "../../enums/available-instances.enum";

import { DispatcherOptions } from "../../interfaces/dispatcher-options.interface";
import { FactoryConfiguration } from "../../interfaces/factory-confifuration.interface";

import { HelpCommand } from "../commands/help.command";
import { GenerateCommand } from "../commands/generate.command";

import { Parser } from "../dispatcher/parser.core";
import { Dispatcher } from "../dispatcher/dispatcher.core";

export class Factory {
    private _instances: FactoryConfiguration = {
        parser: null as any,
        dispatcher: null as any,

        helpCommand: null as any,
        generateCommand: null as any
    };
    private _instancesInitialized: BehaviorSubject<boolean>;

    private _dispatcherOptions: DispatcherOptions[];
    private _parentCtorInitialized: Observable<boolean>;

    public constructor(dispatcherOpts: DispatcherOptions[], parentCtorInitialized: Observable<boolean>) {
        this._dispatcherOptions = dispatcherOpts;
        this._parentCtorInitialized = parentCtorInitialized;
        this._instancesInitialized = new BehaviorSubject(false);

        const instances = this.getInstances();
        this._instances.parser = instances.parser;
        this._instances.dispatcher = instances.dispatcher;
        this._instances.helpCommand = instances.helpCommand;
        this._instances.generateCommand = instances.generateCommand;
    }

    public getInstance<T>(instance: AvailableInstances, newInstance = false): T {
        switch (instance) {
            case AvailableInstances.generateCommand:
                return this._instances.generateCommand as any;
            case AvailableInstances.helpCommand:
                return this._instances.helpCommand as any;
            case AvailableInstances.parser:
                return this._instances.parser as any;
            case AvailableInstances.dispatcher:
                return this._instances.dispatcher as any;
            default:
                throw new Error(`Cannot find required instance in factory: ${AvailableInstances[instance]}`);
        }
    }

    private getInstances(): FactoryConfiguration {
        return {
            parser: new Parser(),
            dispatcher: new Dispatcher(this._parentCtorInitialized),
            helpCommand: new HelpCommand(),
            generateCommand: new GenerateCommand()
        }
    }
}