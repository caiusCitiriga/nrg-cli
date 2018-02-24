import { CommandFlag } from "../../interfaces/command-flag.interface";
import { CommandRunner } from "../../interfaces/command-runner.interface";
import { DispatcherOptions } from "../../interfaces/dispatcher-options.interface";
export declare class GenerateCommand implements CommandRunner {
    private static pathDelimiter;
    private static currentFlags;
    private static itemToGenerate;
    constructor();
    run(dispatcherOptions: DispatcherOptions[], flags: CommandFlag[]): void;
    private static getItemTypeFromUser(data);
    private static getItemFilenameFromUser(data);
    private static getItemExtensionFromUser(data);
    private static ensureIsEnergyProject();
    private static generateItem();
    private static printAvailableTypesList();
    private static extractRelativePathFromItemSourceFolder(data);
    private static extractFilename(data);
    private static extractClassname(data);
    private static extractExtension(data);
    private static extractMultipleUserCustomExtensions(part);
    private static startFileGenerationForThisItem();
    private static composeFoldersStack();
    private static generateFilename(previousFoldersStack);
    private static getCLIConf();
    private static askForItemFilename();
    private static askForItemExtension();
}
