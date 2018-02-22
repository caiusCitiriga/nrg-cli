"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const available_instances_enum_1 = require("../../enums/available-instances.enum");
const help_command_1 = require("../commands/help.command");
const generate_command_1 = require("../commands/generate.command");
const parser_core_1 = require("../dispatcher/parser.core");
const dispatcher_core_1 = require("../dispatcher/dispatcher.core");
class Factory {
    constructor(dispatcherOpts, parentCtorInitialized) {
        this._instances = {
            parser: null,
            dispatcher: null,
            helpCommand: null,
            generateCommand: null
        };
        this._dispatcherOptions = dispatcherOpts;
        this._parentCtorInitialized = parentCtorInitialized;
        this._instancesInitialized = new BehaviorSubject_1.BehaviorSubject(false);
        const instances = this.getInstances();
        this._instances.parser = instances.parser;
        this._instances.dispatcher = instances.dispatcher;
        this._instances.helpCommand = instances.helpCommand;
        this._instances.generateCommand = instances.generateCommand;
    }
    getInstance(instance, newInstance = false) {
        switch (instance) {
            case available_instances_enum_1.AvailableInstances.generateCommand:
                return this._instances.generateCommand;
            case available_instances_enum_1.AvailableInstances.helpCommand:
                return this._instances.helpCommand;
            case available_instances_enum_1.AvailableInstances.parser:
                return this._instances.parser;
            case available_instances_enum_1.AvailableInstances.dispatcher:
                return this._instances.dispatcher;
            default:
                throw new Error(`Cannot find required instance in factory: ${available_instances_enum_1.AvailableInstances[instance]}`);
        }
    }
    getInstances() {
        return {
            parser: new parser_core_1.Parser(),
            dispatcher: new dispatcher_core_1.Dispatcher(this._parentCtorInitialized),
            helpCommand: new help_command_1.HelpCommand(),
            generateCommand: new generate_command_1.GenerateCommand()
        };
    }
}
exports.Factory = Factory;
//# sourceMappingURL=factory.core.js.map