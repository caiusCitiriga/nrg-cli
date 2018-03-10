import 'reflect-metadata';
import { IConfReader } from '../interfaces/conf-reader.interface';
import { IAdditionalType } from '../interfaces/additional-type.interface';
import { ICustomFileTemplate } from '../interfaces/custom-file-template.interface';
export declare class ConfReader implements IConfReader {
    private _cliConfFilename;
    private _configFile;
    constructor();
    getSrcFolder(): string;
    getDefaultFilesExt(): string;
    getAdditionalTypes(): IAdditionalType[];
    getCustomFileTemplates(): ICustomFileTemplate[];
    useDotnetInterfaceStyle(): boolean;
    private ensureIsEnergyProjectFolder();
    private readConf();
    private fillMissingConfigurationsWithDefaults();
}
