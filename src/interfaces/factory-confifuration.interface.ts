import { Parser } from "../core/dispatcher/parser.core";
import { Dispatcher } from "../core/dispatcher/dispatcher.core";

import { CommandRunner } from "./command-runner.interface";

export interface FactoryConfiguration {
    parser: Parser;
    dispatcher: Dispatcher;

    helpCommand: CommandRunner;
    generateCommand: CommandRunner;
}