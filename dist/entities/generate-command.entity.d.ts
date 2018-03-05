import { IFlag } from 'smart-cli/dist/interfaces/plain/flag.interface';
import { ICommandRunner } from '../interfaces/command-runner.interface';
export declare class GenerateCommand implements ICommandRunner {
    private _availableItemTypes;
    private _confReader;
    run(flags: IFlag[]): void;
    private ensureFlagsIntegrity(flags);
    private mergeAdditionalTypesWithDefaultOnes();
    private generateItem(type, flags);
    private parseFilename(rawString);
    private extractExtension(rawString);
    private extractFilename(rawString, extension);
    private extractClassname(rawString, extension);
}
