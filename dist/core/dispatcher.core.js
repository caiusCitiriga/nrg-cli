"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ui_service_1 = require("../services/ui.service");
class Dispatcher {
    /**
     * Takes the configuration containing all the available commands and the current command set.
     * It searches the command through all the available commands in the configuration.
     * If a match is found the action binded to that command will be executed.
     * Otherwise an error on the console will be printed.
     */
    dispatch(configuration, commandSet) {
        let action = null;
        configuration.forEach(cs => {
            //  Try direct command match
            if (commandSet.command && cs.command.toLowerCase() === commandSet.command.trim().toLowerCase()) {
                action = cs.action;
            }
            //  If the action is still null, try aliases match
            if (action === null && cs.aliases && cs.aliases.find((a) => a === commandSet.command)) {
                action = cs.action;
            }
        });
        //  Last check, if action is still null, fire an invalid command error
        if (!action) {
            ui_service_1.UI.error('Invalid command');
            return;
        }
        action(commandSet.flags); // Exec the action providing the flags
    }
}
exports.Dispatcher = Dispatcher;
//# sourceMappingURL=dispatcher.core.js.map