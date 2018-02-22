import * as SCLI from "smart-cli/dist";

import { SeverityEnum } from "../../enums/severity.enum";

import { DispatcherOptions } from "../../interfaces/dispatcher-options.interface";
import { DispatcherCommandSet } from "../../interfaces/dispatcher-command-set.interface";

import { UI } from "../../core/ui.core";
import { CORE_COMMANDS } from "../../consts/core-commands.const";
import { Observable } from "rxjs/Observable";

export class Dispatcher {
    private _parentCtorInitialized: Observable<boolean>;

    public constructor(parentCtorInitialized: Observable<boolean>) {
        this._parentCtorInitialized = parentCtorInitialized;
    }

    /**
     * Takes the configuration containing all the available commands and the current command set. 
     * It searches the command through all the available commands in the configuration.
     * If a match is found the action binded to that command will be executed.
     * Otherwise an error on the console will be printed.
     */
    public dispatch(configuration: DispatcherOptions[], commandSet: DispatcherCommandSet) {
        let action: any = null;

        configuration.forEach(cs => {
            //  Try direct command match
            if (commandSet.command && cs.command.toLowerCase() === commandSet.command.trim().toLowerCase()) {
                action = cs.action;
            }

            //  If the action is still null, try aliases match
            if (action === null && cs.aliases && cs.aliases.find((a: string) => a === commandSet.command)) {
                action = cs.action;
            }
        });

        //  Last check, if action is still null, fire an invalid command error
        if (!action) {
            this._parentCtorInitialized
                .filter(res => !!res)
                .subscribe(res => (configuration.find(conf => conf.command === CORE_COMMANDS.help.command) as DispatcherOptions).action([]));
            return;
        }

        action(commandSet.flags);   // Exec the action providing the flags
    }
}