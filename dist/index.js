#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/zip");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/takeWhile");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const core_commands_const_1 = require("./consts/core-commands.const");
const available_instances_enum_1 = require("./enums/available-instances.enum");
const default_dispatcher_options_const_1 = require("./consts/default-dispatcher-options.const");
const factory_core_1 = require("./core/factory/factory.core");
class EnergyCLI {
    constructor() {
        //  Shitty TS doesn't understand that in strict mode these instances can be intialized into another method
        //  Need to do it ALL here -,-''
        //  Mock these instances at first, they will be assigned by the factory
        this._parser = {};
        this._dispatcher = {};
        this._helpCommand = {};
        this._generateCommand = {};
        //  Core class properties initialization
        this._dispatcherOptions = this.getDispatcherOptions();
        this._parentCtorInitialized = new BehaviorSubject_1.BehaviorSubject(false);
        //  Init factory and check that is successfully initialized
        this._factory = new factory_core_1.Factory(this._dispatcherOptions, this._parentCtorInitialized);
        if (!(this._factory instanceof factory_core_1.Factory)) {
            throw new Error('Couldn\'t initialize the FACTORY');
        }
        //  Wait the value from all the instances and bind them all at once. Then unsubscribe by setting the val to false
        this._parser = this._factory.getInstance(available_instances_enum_1.AvailableInstances.parser);
        this._dispatcher = this._factory.getInstance(available_instances_enum_1.AvailableInstances.dispatcher);
        this._helpCommand = this._factory.getInstance(available_instances_enum_1.AvailableInstances.helpCommand);
        this._generateCommand = this._factory.getInstance(available_instances_enum_1.AvailableInstances.generateCommand);
        //  Tell the dispatcher that it can start dispatching commands from now on
        this._parentCtorInitialized.next(true);
        this._dispatcher.dispatch(this._dispatcherOptions, this._parser.getCommandSet());
    }
    getDispatcherOptions() {
        const dispatcherOPTS = default_dispatcher_options_const_1.DEFAULT_DISPATCHER_OPTS;
        dispatcherOPTS.assignCallbackToCommand(core_commands_const_1.CORE_COMMANDS.new.command, (flags) => console.log('called new command'));
        dispatcherOPTS.assignCallbackToCommand(core_commands_const_1.CORE_COMMANDS.init.command, (flags) => console.log('called init command'));
        dispatcherOPTS.assignCallbackToCommand(core_commands_const_1.CORE_COMMANDS.help.command, (flags) => console.log('called help command'));
        dispatcherOPTS.assignCallbackToCommand(core_commands_const_1.CORE_COMMANDS.generate.command, (flags) => console.log('called generate command'));
        return dispatcherOPTS.options;
    }
}
exports.EnergyCLI = EnergyCLI;
const NRG = new EnergyCLI();
//# sourceMappingURL=index.js.map