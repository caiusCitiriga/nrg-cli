import 'reflect-metadata';
import 'rxjs/add/operator/filter';
import { IEnergy } from './interfaces/energy.interface';
import { ICommandRunner } from './interfaces/command-runner.interface';
export declare class EnergyCLI implements IEnergy {
    private _cli;
    private _initComand;
    private _generateComand;
    constructor(generateComand: ICommandRunner, initComand: ICommandRunner);
    /**
     * Runs the program with the given args
     *
     * @param {string} args
     * @memberof EnergyCLI
     */
    runProgram(args: string): void;
    private initSmartCLI();
    private setupCLI();
}
