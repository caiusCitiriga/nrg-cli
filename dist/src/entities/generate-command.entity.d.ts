import { Observable } from 'rxjs/Observable';
import { IFlag } from 'smart-cli/dist/interfaces/plain/flag.interface';
import { ICommandRunner } from '../interfaces/command-runner.interface';
export declare class GenerateCommand implements ICommandRunner {
    private _UI;
    private _availableItemTypes;
    private _confReader;
    constructor();
    run(flags: IFlag[]): Observable<boolean>;
    private ensureFlagsIntegrity(flags);
    private mergeAdditionalTypesWithDefaultOnes();
    private generateItem(itemType, flags);
    private extractExtension(rawString);
    private extractFilename(rawString, extension);
    private extractClassname(rawString, extension);
    private ensureEveryFolderExistsBeforeWrite(pathItems);
}
