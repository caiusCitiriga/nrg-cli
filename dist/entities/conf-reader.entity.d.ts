import 'reflect-metadata';
import { IConfReader } from '../interfaces/conf-reader.interface';
import { IEnergyAdditionalType } from '../interfaces/energy-cli-conf.interface';
export declare class ConfReader implements IConfReader {
    private _cliConfFilename;
    private _configFile;
    constructor();
    getSrcFolder(): string;
    getDefaultFilesExt(): string;
    getAdditionalTypes(): IEnergyAdditionalType[];
    useDotnetInterfaceStyle(): boolean;
    private ensureIsEnergyProjectFolder();
    private readConf();
    private fillMissingConfigurationsWithDefaults();
}
