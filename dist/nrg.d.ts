import 'reflect-metadata';
import { IEnergy } from './interfaces/energy.interface';
export declare class EnergyCLI implements IEnergy {
    private _cli;
    private _generateComand;
    constructor();
    /**
     * Runs the CLI program passing the user args.
     *
     * @memberof EnergyCLI
     */
    runProgram(): void;
    private setupCLI();
}
