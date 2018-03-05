import 'reflect-metadata';
import { IEnergy } from './interfaces/energy.interface';
import { ICommandRunner } from './interfaces/command-runner.interface';
export declare class EnergyCLI implements IEnergy {
    private _cli;
    private _generateComand;
    constructor(generateComand: ICommandRunner);
    /**
     * Runs the CLI program passing the user args.
     *
     * @memberof EnergyCLI
     */
    runProgram(): void;
    private setupCLI();
}
