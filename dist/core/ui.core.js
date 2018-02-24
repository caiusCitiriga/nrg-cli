"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/observable/of");
const process = __importStar(require("process"));
const dist_1 = require("smart-cli/dist");
class UI {
    static askUserInput(question, callback, surroundInNewLines) {
        const __this = this;
        const stdin = process.stdin;
        const stdout = process.stdout;
        if (stdin.isPaused()) {
            stdin.resume();
        }
        if (surroundInNewLines) {
            console.log();
        }
        stdout.write(question);
        if (surroundInNewLines) {
            console.log();
        }
        stdin.once('data', (data) => {
            data = data.toString().trim();
            stdin.pause();
            if (callback) {
                callback(data);
            }
        });
    }
    static clear() {
        var lines = process.stdout.getWindowSize()[1];
        for (var i = 0; i < lines; i++) {
            console.log('');
        }
    }
    static print(string, surroundInNewlines) {
        if (surroundInNewlines) {
            console.log();
        }
        dist_1.SmartCLI.GenericOutput.printMessage(string);
        if (surroundInNewlines) {
            console.log();
        }
    }
    static throw(message, callback, clearTime = 1000) {
        if (!callback) {
            throw new Error('Cannot run UI.throw without any callback passed');
        }
        UI.clear();
        UI.error(message);
        setTimeout(() => {
            UI.clear();
            callback();
        }, clearTime);
    }
    static success(string, surroundInNewlines) {
        if (surroundInNewlines) {
            console.log();
        }
        dist_1.SmartCLI.GenericOutput.printInfo(`\u2713 ${string}`);
        if (surroundInNewlines) {
            console.log();
        }
    }
    static warn(string, surroundInNewlines) {
        if (surroundInNewlines) {
            console.log();
        }
        dist_1.SmartCLI.GenericOutput.printWarning(string);
        if (surroundInNewlines) {
            console.log();
        }
    }
    static info(string, surroundInNewlines) {
        if (surroundInNewlines) {
            console.log();
        }
        dist_1.SmartCLI.GenericOutput.printInfo(string);
        if (surroundInNewlines) {
            console.log();
        }
    }
    static error(string, surroundInNewlines) {
        if (surroundInNewlines) {
            console.log();
        }
        dist_1.SmartCLI.GenericOutput.printError(string);
        if (surroundInNewlines) {
            console.log();
        }
    }
    static printTableExperimental(maxLen, currLen) {
        let spaces = '';
        for (let i = 0; i < (maxLen - currLen); i++) {
            spaces += ' ';
        }
        return spaces;
    }
}
exports.UI = UI;
//# sourceMappingURL=ui.core.js.map