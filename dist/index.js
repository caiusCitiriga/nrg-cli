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
        this._dispatcherOptions = default_dispatcher_options_const_1.DEFAULT_DISPATCHER_OPTS.options;
        this._parentCtorInitialized = new BehaviorSubject_1.BehaviorSubject(false);
        this._factory = new factory_core_1.Factory(this._dispatcherOptions, this._parentCtorInitialized);
        if (!(this._factory instanceof factory_core_1.Factory)) {
            throw new Error('Couldn\'t initialize the FACTORY');
        }
        this._parser = this._factory.getInstance(available_instances_enum_1.AvailableInstances.parser);
        this._dispatcher = this._factory.getInstance(available_instances_enum_1.AvailableInstances.dispatcher);
        this._helpCommand = this._factory.getInstance(available_instances_enum_1.AvailableInstances.helpCommand);
        this._generateCommand = this._factory.getInstance(available_instances_enum_1.AvailableInstances.generateCommand);
        const callbacksBinding = {
            newCmd: (flags) => console.log('Called new command'),
            initCmd: (flags) => console.log('Called init command'),
            helpCmd: (flags) => this._helpCommand.run(this._dispatcherOptions, flags),
            generateCmd: (flags) => this._generateCommand.run(this._dispatcherOptions, flags),
        };
        this.assignActionsToDispatcherCommands(callbacksBinding);
        //  Tell the dispatcher that it can start dispatching commands from now on
        this._parentCtorInitialized.next(true);
        this._dispatcher.dispatch(this._dispatcherOptions, this._parser.getCommandSet());
    }
    assignActionsToDispatcherCommands(bindings) {
        const dispatcherOPTS = default_dispatcher_options_const_1.DEFAULT_DISPATCHER_OPTS;
        dispatcherOPTS.assignCallbackToCommand(core_commands_const_1.CORE_COMMANDS.new.command, bindings.newCmd);
        dispatcherOPTS.assignCallbackToCommand(core_commands_const_1.CORE_COMMANDS.init.command, bindings.initCmd);
        dispatcherOPTS.assignCallbackToCommand(core_commands_const_1.CORE_COMMANDS.help.command, bindings.helpCmd);
        dispatcherOPTS.assignCallbackToCommand(core_commands_const_1.CORE_COMMANDS.generate.command, bindings.generateCmd);
        return dispatcherOPTS.options;
    }
}
exports.EnergyCLI = EnergyCLI;
const NRG = new EnergyCLI();
//# sourceMappingURL=index.js.map