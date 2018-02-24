import "rxjs/add/observable/of";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as chalk from 'chalk';
import * as process from 'process';
import { SmartCLI } from 'smart-cli/dist';

export class UI {

    public static askUserInput(question: string, callback?: (data: string) => void, surroundInNewLines?: boolean): void {
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

    public static clear(): void {
        var lines = (process.stdout as any).getWindowSize()[1];
        for (var i = 0; i < lines; i++) {
            console.log('');
        }
    }

    public static print(string: string, surroundInNewlines?: boolean) {
        if (surroundInNewlines) {
            console.log();
        }
        SmartCLI.GenericOutput.printMessage(string);
        if (surroundInNewlines) {
            console.log();
        }
    }

    public static throw(message: string, callback: any, clearTime = 1000) {
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

    public static success(string: string, surroundInNewlines?: boolean) {
        if (surroundInNewlines) {
            console.log();
        }

        SmartCLI.GenericOutput.printInfo(`\u2713 ${string}`);
        if (surroundInNewlines) {
            console.log();
        }
    }

    public static warn(string: string, surroundInNewlines?: boolean) {
        if (surroundInNewlines) {
            console.log();
        }
        SmartCLI.GenericOutput.printWarning(string);
        if (surroundInNewlines) {
            console.log();
        }
    }

    public static info(string: string, surroundInNewlines?: boolean) {
        if (surroundInNewlines) {
            console.log();
        }
        SmartCLI.GenericOutput.printInfo(string);
        if (surroundInNewlines) {
            console.log();
        }
    }

    public static error(string: string, surroundInNewlines?: boolean) {
        if (surroundInNewlines) {
            console.log();
        }
        SmartCLI.GenericOutput.printError(string);
        if (surroundInNewlines) {
            console.log();
        }
    }

    public static printTableExperimental(maxLen: number, currLen: number) {
        let spaces = '';
        for (let i = 0; i < (maxLen - currLen); i++) {
            spaces += ' ';
        }

        return spaces;
    }
}