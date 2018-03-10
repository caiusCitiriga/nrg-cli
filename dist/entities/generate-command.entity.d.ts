import { Observable } from 'rxjs/Observable';
import { IFlag } from 'smart-cli/dist/interfaces/plain/flag.interface';
import { IConfReader } from '../interfaces/conf-reader.interface';
import { ICommandRunner } from '../interfaces/command-runner.interface';
export declare class GenerateCommand implements ICommandRunner {
    private _UI;
    private _confReader;
    private _subfoldersDelimiter;
    private _availableItemTypes;
    constructor(confReader: IConfReader);
    run(flags: IFlag[]): Observable<boolean>;
    private ensureFlagsIntegrity(flags);
    private mergeAdditionalTypesWithDefaultOnes();
    private generateItem(itemType, flags);
    private extractItemData(flags, itemType);
    private getFileContent(itemType, itemData);
    private generateDetaultTSItem(itemType, itemData);
    private extractExtension(rawString, itemTypeName);
    private extractFilename(rawString, extension);
    private extractClassname(rawString, extension, itemType);
    private ensureEveryFolderExistsBeforeWrite(itemData);
    private writeFile(jobStatus, itemData);
}
